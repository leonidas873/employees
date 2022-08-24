import { Formik, Form, Field, ErrorText, useField } from "formik";
import * as Yup from "yup";
import styles from "../styles/Feedback.module.css";
import MainLayout from "../components/common/MainLayout/MainLayout";
import { ToastContainer, toast } from "react-toastify";

const Feedback = () => {
  const genInitialValues = () => ({ email: "", name: "", feedback: "" });
  const notify = () => toast("Feedback sent");

  return (
    <MainLayout>
      <div className={styles.feedback}>
        <h2>Send Feedback</h2>
        <div className={styles.formWrapper}>
          <Formik
            initialValues={genInitialValues()}
            validationSchema={Yup.object({
              name: Yup.string()
                .max(20, "Must be 15 characters or less")
                .required("Required"),
              email: Yup.string()
                .email("Invalid email addresss`")
                .required("Required"),
              feedback: Yup.string().required("Required"),
            })}
            onSubmit={async (
              { name, email, feedback },
              { setSubmitting, resetForm }
            ) => {
              await fetch("https://reqres.in/api/users", {
                method: "POST",
                headers: {
                  "Content-type": "application/json",
                },
                body: JSON.stringify({ name, email, feedback }),
              }).then(() => {
                setSubmitting(false);
                notify();
                resetForm({ values: genInitialValues() });
              });
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <MyTextInput
                  label="Name:"
                  name="name"
                  type="text"
                  placeholder="your name..."
                />
                <MyTextInput
                  label="Email Address:"
                  name="email"
                  type="email"
                  placeholder="your email..."
                />
                <MyTextArea
                  label="Feedback:"
                  name="feedback"
                  rows="6"
                  placeholder="enter your feedback please..."
                />
                <div className={styles.submitBtn}>
                  {" "}
                  <button type="submit" disabled={isSubmitting}>
                    Submit
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </MainLayout>
  );
};

export default Feedback;

const MyTextArea = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name} className={styles.inputLable}>
        {label}
      </label>
      <textarea
        className={
          styles.textInput +
          " " +
          (meta.touched && meta.error ? styles.textInputInvalid : "")
        }
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className={styles.error}>{meta.error}</div>
      ) : null}
    </>
  );
};

const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name} className={styles.inputLable}>
        {label}
      </label>
      <input
        className={
          styles.textInput +
          " " +
          (meta.touched && meta.error ? styles.textInputInvalid : "")
        }
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className={styles.error}>{meta.error}</div>
      ) : null}
    </>
  );
};
