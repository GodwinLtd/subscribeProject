const {
  Subscribe,
  validate,
  validateSendBulkMail,
} = require("../middleware/subscribe");
const sendMail = require("../utils/sendMail");

const getSubscribeEmail = async function (req, res, next) {
  try {
    const subscribe = await Subscribe.find();
    if (!subscribe) return res.status(404).send("404 not found");

    await subscribe.save();

    res.status(200).json({ data: subscribe });
  } catch (ex) {
    next();
  }
};

const subscribeEmail = async function (req, res, next) {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let subscribe = await Subscribe.findOne({ email: req.body.email });
    if (subscribe) return res.status(400).send("Email already subscribed");

    subscribe = new Subscribe({
      email: req.body.email,
    });

    await subscribe.save();

    res.status(201).json({ data: subscribe });
  } catch (ex) {
    next();
  }
};

const sendBulkMail = async function (req, res, next) {
  try {
    const { error } = validateSendBulkMail(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const subscribe = await Subscribe.find().select("email -_id");

    const allEmails = subscribe
      .map((x) => {
        return x.email;
      })
      .join(",");

    const html = req.body.html;

    sendMail(
      {
        from: "gd@work.com",
        to: allEmails,
        subject: "Forgot Your Password?",
        text: "Please ignore if you didn't requested for this.",
        html,
      },
      res,
      async () => {
        await subscribe.save();
        res.status(200).send("Mail sent successfully");
      }
    );
  } catch (ex) {
    next();
  }
};

const deleteSubscribeEmail = async function (req, res, next) {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const subscribe = await Subscribe.findOneAndDelete({
      email: req.body.email,
    });
    if (!subscribe) return res.status(404).send("Email not subscribed");

    res.status(200).send(subscribe);
  } catch (ex) {
    next();
  }
};

exports.subscribeEmail = subscribeEmail;
exports.getSubscribeEmail = getSubscribeEmail;
exports.sendBulkMail = sendBulkMail;
exports.deleteSubscribeEmail = deleteSubscribeEmail;
