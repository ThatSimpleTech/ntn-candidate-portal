"""Pricing quote API.

Python Lambda fronted by a Function URL, defined through the CDK escape
hatch in amplify/backend.ts. Mirrors the maintenance surface of NTN's
existing SAM/Python API layer: same runtime, same handler conventions.

Pricing model (public figures): base test fee covers one department;
each additional department adds a flat transfer fee.
"""

import json

BASE_PRICES = {
    "fireteam": 55.00,
    "frontline-national": 55.00,
    "ecomm-national": 55.00,
    "react": 41.00,
    "impact": 41.00,
    "medicteam": 80.00,
    "start": 41.00,
    "cpat": 125.00,
}

ADDITIONAL_DEPARTMENT_FEE = 12.00

# CORS is owned entirely by the Function URL config (amplify/backend.ts);
# emitting Access-Control-* here too produces duplicate headers, which
# browsers reject.
def _response(status, body):
    return {
        "statusCode": status,
        "headers": {"Content-Type": "application/json"},
        "body": json.dumps(body),
    }


def lambda_handler(event, context):
    params = event.get("queryStringParameters") or {}
    method = (
        event.get("requestContext", {}).get("http", {}).get("method", "GET")
    )
    if method == "POST" and event.get("body"):
        try:
            params = json.loads(event["body"])
        except json.JSONDecodeError:
            return _response(400, {"error": "Request body must be valid JSON."})

    test_slug = str(params.get("test", "")).lower().strip()
    if test_slug not in BASE_PRICES:
        return _response(
            400,
            {
                "error": f"Unknown test '{test_slug}'.",
                "validTests": sorted(BASE_PRICES),
            },
        )

    try:
        departments = int(params.get("departments", 1))
    except (TypeError, ValueError):
        return _response(400, {"error": "'departments' must be an integer."})
    if not 1 <= departments <= 50:
        return _response(400, {"error": "'departments' must be between 1 and 50."})

    base = BASE_PRICES[test_slug]
    additional = (departments - 1) * ADDITIONAL_DEPARTMENT_FEE
    return _response(
        200,
        {
            "test": test_slug,
            "departments": departments,
            "lineItems": [
                {"label": "Test fee (includes one department)", "amount": base},
                {
                    "label": f"Additional departments ({departments - 1} x ${ADDITIONAL_DEPARTMENT_FEE:.0f})",
                    "amount": additional,
                },
            ],
            "total": round(base + additional, 2),
            "currency": "USD",
        },
    )
