// import React from 'react';
import React, { useEffect, useState } from 'react';

function Alert({message, type}) {

  useEffect(() => {
    const modalElement = document.getElementById('alertModal');
    if (!modalElement) return; // Check if modal element exists

    const bootstrapModal = new window.bootstrap.Modal(modalElement);
    bootstrapModal.show();
  }, []);

  const handleClose = () => {
    const modalBackdrop = document.querySelector('.modal-backdrop');
    if (modalBackdrop) {
      modalBackdrop.parentNode.removeChild(modalBackdrop); 
    }
  };

  let alertType = {success: 'alert text-center fade show alert-success',
                    warning: 'alert text-center fade show alert-warning ',
                    error: 'alert text-center fade show alert-danger'};
  return (
    <div className="modal fade show" id="alertModal" tabIndex="-1" aria-labelledby="alertModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog" style={{bottom: "0", position: "fixed", left: "50%", transform: "translateX(-50%)"}}>
        <div className={alertType[type]} role="alert">
          {message}
        </div>
      </div>
    </div>
  );
}

export default Alert;