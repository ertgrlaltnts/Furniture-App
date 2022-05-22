const nodemailer = require("nodemailer");

exports.getIndexPage = (req, res) => {
  console.log(req.session.userID);
  res.status(200).render("index", {
    page_name: "index",
  });
};

exports.getAboutPage = (req, res) => {
  res.status(200).render("about", {
    page_name: "about",
  });
};

exports.getLoginPage = (req, res) => {
  res.status(200).render("login", {
    page_name: "login",
  });
};

exports.getRegisterPage = (req, res) => {
  res.status(200).render("register", {
    page_name: "register",
  });
};

exports.getContactPage = (req, res) => {
  res.status(200).render("contact", {
    page_name: "contact",
  });
};

exports.sendEmail = async (req, res) => {
  try {
    const outputMessage = `
    <h1>Mail Details</h1>
    <ul>
    <li>Name : ${req.body.name}</li>
    <li>Email : ${req.body.email}</li>
    </ul>
    <h1>Message</h1>
    <p>${req.body.message}</p>
    `;

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: "ertgrlaltnts@gmail.com", // generated ethereal user
        pass: "svlgzwukuuoindmj", // generated ethereal password
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Furniture Contact Form" <ertgrlaltnts@gmail.com>', // sender address
      to: "dytnazlidurak@gmail.com", // list of receivers
      subject: "Furniture Contact New Message ✔", // Subject line
      html: outputMessage, // html body
    });
    res.status(200).redirect("/contact");
  } catch (error) {
    res.status(200).redirect("/contact");
  }
};
