

export let primaryKeyViolation = {
    error: "PRIMARY_KEY_VIOLATION",
    status: 400,
    message: `id not present`,
  };
  
  export let dbErr = {
    error: "database error",
    message: "unable to post or update data, check your fields correctly",
    status: "500",
  };
  
  export let insertSuccessful={
      status : 201,
      message : "data inserted"
  }
  
  export let deleteMessage = {
      status: 200,
      response: `record deleted`,
    };
  
    export let idNotFound = {
      status: 400,
      result: `id not found`,
    };
    export let unsuccessfulUpdate = {
      status: 400,
      result: `id not found`,
    };
    export let updatedMessage = {
      status: 200,
      result: `id found`,
    };