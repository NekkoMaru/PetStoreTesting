# PetStore API Documentation

## GET /pet/{petId}

### Functional Testing:
This endpoint retrieves information about a pet by its ID. It expects a successful HTTP response with a status code of 200 and a pet object containing the specified ID.

### Negative Testing:
Requests for non-existing pet IDs are validated by this endpoint. It should respond with an HTTP status code of 404, indicating that the requested pet was not found.

### Edge Case Testing:
This endpoint handles boundary values for pet IDs. It is expected to correctly return a pet object for boundary pet ID values.

## POST /pet

### Functional Testing:
This endpoint adds a new pet to the store. It expects a successful HTTP response with a status code of 200 and the newly created pet object returned in the response body.

### Edge Case Testing:
Adding a pet with the maximum ID value is tested by this endpoint. It should successfully add a pet with the maximum ID value and return the created pet object.

## PUT /pet

### Functional Testing:
This endpoint updates information about an existing pet. It expects a successful HTTP response with a status code of 200 and the updated pet object returned in the response body.

### Edge Case Testing:
Updating information about a pet with the maximum ID value is tested by this endpoint. It should successfully update the pet information and return the updated pet object.

## DELETE /pet/{petId}

### Functional Testing:
This endpoint deletes a pet from the store by its ID. It expects a successful HTTP response with a status code of 200, indicating that the pet was successfully deleted.

### Negative Testing:
Deleting a pet with a non-existing ID is validated by this endpoint. It should respond with an HTTP status code of 404, indicating that the requested pet was not found.

## GET /pet/findByStatus?status={status}

### Functional Testing:
This endpoint retrieves a list of pets by their status. It expects a successful HTTP response with a status code of 200 and a list of pets with the specified status in the response body.

### Edge Case Testing:
Searching for pets by a status that returns an empty list is tested by this endpoint. It should successfully return an empty list of pets for the specified status.
