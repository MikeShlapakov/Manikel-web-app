import React from 'react';

function Alert({message, type}) {

  let alertType = {success: 'alert alert-dismissible fade show mb-3 alert-success',
                    warning: 'alert alert-dismissible fade show mb-3 alert-warning',
                    error: 'alert alert-dismissible fade show mb-3 alert-danger'};

  return (
    <div className={alertType[type]} role="alert">
        {message}
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
        ></button>
  </div>
  );
}

export default Alert;