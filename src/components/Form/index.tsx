import React, { useState, forwardRef } from "react";
import Toast from "@/components/Toast";

interface ContactFormProps {
  id: string;
}

const ContactForm = forwardRef<HTMLDivElement, ContactFormProps>(
  (props, ref) => {
    const [toast, setToast] = useState<{
      message: string;
      type: "success" | "error";
    } | null>(null);
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      message: "",
    });
    const [lastSubmissionTime, setLastSubmissionTime] = useState<number | null>(
      null,
    );
    const [submissionCount, setSubmissionCount] = useState(0);

    const { id } = props;

    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      const { name, email, message } = formData;

      const now = Date.now();

      if (lastSubmissionTime && now - lastSubmissionTime < 60000) {
        setSubmissionCount((prevCount) => prevCount + 1);
      } else {
        setSubmissionCount(1);
        setLastSubmissionTime(now);
      }

      if (submissionCount > 3) {
        setToast({
          message: "Too many submissions. Please wait a moment.",
          type: "error",
        });
        return;
      }

      if (!name || !email || !message) {
        setToast({
          message: "Please fill out all fields",
          type: "error",
        });
        return;
      }

      try {
        const response = await fetch("https://backend-email-serverice-env.eba-yzyimp2w.eu-west-2.elasticbeanstalk.com/api/send-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, message }),
        });

        if (response.ok) {
          setToast({
            message: "Message sent successfully",
            type: "success",
          });
          setFormData({
            name: "",
            email: "",
            message: "",
          });
        } else {
          const data = await response.json();
          setToast({
            message: data.error || "Error sending message",
            type: "error",
          });
        }
      } catch (error) {
        console.error(error);
        setToast({
          message: "Error sending message",
          type: "error",
        });
      }
    };

    return (
      <div className="contact-form-container p-10 sm:p-20 rounded-lg" id={id} ref={ref}>
        <h2 className="text-center text-4xl font-semibold text-red-500 mb-10 font-montserrat title-underline">
          Contact Me
        </h2>

        <div className="contact-form-container">
          {toast && (
            <Toast
              message={toast.message}
              type={toast.type}
              onClose={() => setToast(null)}
            />
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-white font-bold mb-2" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-white font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-white font-bold mb-2"
                htmlFor="message"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border rounded-md"
                required
              ></textarea>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  },
);

export default ContactForm;
