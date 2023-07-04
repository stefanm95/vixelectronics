import axios from "axios";
import { auth } from "../firebase";



export const sendInvoiceEmail = async (authtoken) => {
  try {
    const user = auth.currentUser;
    
    console.log('Current user: ', user);
    if (user) {
      await axios.post(
        `${process.env.REACT_APP_API}/sendInvoice`,
        {
          userEmail: user.email,
        },
        {
          headers: {
            authtoken,
          },
        }
      );
      console.log("Invoice email sent");
    } else {
      console.log("User not found");
    }
  } catch (error) {
    console.error("Error sending invoice email:", error);
  }
};
