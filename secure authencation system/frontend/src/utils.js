import { toast } from 'react-toastify';

export const handleSuccess = (msg) => {
    toast.success(msg, {
        position: 'top-right',
        autoClose: 3000, // Closes after 3 seconds
        hideProgressBar: false, // Shows progress bar
        closeOnClick: true, // Allows click to close
        pauseOnHover: true, // Pauses toast on hover
        draggable: true, // Allows dragging
        theme: "colored" // Uses colored theme
    });
};

export const handleError = (msg) => {
    toast.error(msg, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored"
    });
};
