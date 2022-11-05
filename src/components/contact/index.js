import { useFormik } from "formik";
import * as Yup from "yup";
import { Alert } from "react-bootstrap";
import { useDispatch } from "react-redux";

import { sendMessage } from "../../store/utils/thunks";
import { showToast } from "../utils/tools";

const Contact = () => {
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues:{email:"", firstname:"", lastname:"", message:""},
        validationSchema: Yup.object({
            email:Yup.string()
            .required("Sorry, the email is required")
            .email("Sorry, the email is invalid"),
            firstname: Yup.string()
            .required("Sorry, the fist name is required"),
            lastname: Yup.string()
            .required("Sorry, the last name is required"),
            message: Yup.string()
            .required("Sorry, the messgae is required")
            .max(500, "Sorry the message is too long")
        }),
        onSubmit:(values, { resetForm }) => {

            dispatch(sendMessage(values))
            .unwrap()
            .then((response)=> {
                if (response) {
                    resetForm();
                    showToast("SUCCESS", "Thanks, we will get back to you shortly")
                } 
            })
            .catch(err=>{
                showToast("ERROR", "Sorry, please try again later")
            })
        }
    })


    return (
        <div>
            <h1> Contact Us</h1>
            <form className="mt-3" onSubmit={formik.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                        typeof="email"
                        className="form-control"
                        name="email"
                        placeholder="email@example.com"
                        {...formik.getFieldProps("email")}
                    />
                    { formik.errors.email && formik.touched.email ?
                    <Alert variant="danger">
                        { formik.errors.email }
                    </Alert>
                    :null}
                </div>

                <div className="form-group mt-2">
                    <label htmlFor="firstname">First Name</label>
                    <input
                        typeof="text"
                        className="form-control"
                        name="firstname"
                        placeholder="Enter Your First Name"
                        {...formik.getFieldProps("firstname")}
                    />
                    { formik.errors.firstname && formik.touched.firstname ?
                    <Alert variant="danger">
                        { formik.errors.firstname }
                    </Alert>
                    :null}
                </div>

                <div className="form-group mt-2">
                    <label htmlFor="lastname">Last Name</label>
                    <input
                        typeof="text"
                        className="form-control"
                        name="lastname"
                        placeholder="Enter Your Last Name"
                        {...formik.getFieldProps("lastname")}
                    />
                    { formik.errors.lastname && formik.touched.lastname ?
                    <Alert variant="danger">
                        { formik.errors.lastname }
                    </Alert>
                    :null}
                </div>

                <div className="form-group mt-2">
                    <label htmlFor="message">Message</label>
                    <textarea
                        className="form-control"
                        name="message"
                        rows={3}
                        {...formik.getFieldProps("message")}
                    />
                    { formik.errors.message && formik.touched.message ?
                    <Alert variant="danger">
                        { formik.errors.message }
                    </Alert>
                    :null}
                </div>
                <button type="submit" className="btn btn-primary mt-2">
                        Send Message 
                </button>
            </form>  
        </div>
    )
}

export default Contact;