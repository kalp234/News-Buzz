import React, { useEffect } from "react";

function Contact() {
  useEffect(() => {
    const form = document.getElementById("form");
    const result = document.getElementById("result");

    const handleSubmit = (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      var object = {};
      formData.forEach((value, key) => {
        object[key] = value;
      });
      var json = JSON.stringify(object);
      result.innerHTML = "Please wait...";

      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json,
      })
        .then(async (response) => {
          let json = await response.json();
          if (response.status === 200) {
            result.innerHTML = json.message;
            result.classList.remove("text-gray-500");
            result.classList.add("text-success"); // Bootstrap text color for success
          } else {
            console.log(response);
            result.innerHTML = json.message;
            result.classList.remove("text-gray-500");
            result.classList.add("text-danger"); // Bootstrap text color for danger
          }
        })
        .catch((error) => {
          console.log(error);
          result.innerHTML = "Something went wrong!";
        })
        .then(() => {
          form.reset();
          setTimeout(() => {
            result.style.display = "none";
          }, 5000);
        });
    };

    form.addEventListener("submit", handleSubmit);

    return () => {
      form.removeEventListener("submit", handleSubmit);
    };
  }, []);

  return (
    <div className="container-fluid bg-white text-light py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="card bg-light text-dark mt-5 p-4 rounded shadow">
              <div className="card-body">
                <h1 className="mb-4 text-center">Contact Us</h1>
                <p className="text-center mb-4">Fill up the form below to send us a message.</p>
                <form action="https://api.web3forms.com/submit" method="POST" id="form">
                  <input type="hidden" name="access_key" value="36e897ab-964f-429e-965e-e8934ced8061" />
                  <input type="hidden" name="subject" value="New Submission from Web3Forms" />
                  <input type="checkbox" name="botcheck" id="" style={{ display: "none" }} />
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Full Name</label>
                    <input type="text" name="name" id="name" placeholder="Enter Your Full Name" required className="form-control" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email Address</label>
                    <input type="email" name="email" id="email" placeholder="Enter a valid Email Address" required className="form-control" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone Number</label>
                    <input type="text" name="phone" id="phone" placeholder="Enter Your Phone Number" required className="form-control" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="message" className="form-label">Your Message</label>
                    <textarea rows="5" name="message" id="message" placeholder="The Charcter limit for your message is 300 words." required className="form-control"></textarea>
                  </div>
                  <div className="mb-3">
                    <button type="submit" className="btn btn-primary w-100">Send Message</button>
                  </div>
                  <p className="text-center text-muted" id="result"></p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
