const Question = require("../models/question");
const Section = require("../models/section");

exports.createQuestion = async (req, res) => {
  try {
    const { sectionId, questionAr, questionEn, type, order } = req.body;

    const section = await Section.findById(sectionId);
    if (!section) return res.status(404).json({ message: "Section not found" });

    const question = new Question({ questionAr, questionEn, type, section: sectionId, order });
    await question.save();

    section.questions.push(question._id);
    await section.save();

    res.status(201).json({ message: "Question created successfully", question });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateQuestion = async (req, res) => {
  try {
    const { questionId } = req.params;
    const { questionAr, questionEn, type, order } = req.body;

    const question = await Question.findByIdAndUpdate(
      questionId,
      { questionAr, questionEn, type, order },
      { new: true, runValidators: true }
    );

    if (!question) return res.status(404).json({ message: "Question not found" });

    res.status(200).json({ message: "Question updated successfully", question });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteQuestion = async (req, res) => {
  try {
    const { questionId } = req.params;

    const question = await Question.findByIdAndDelete(questionId);
    if (!question) return res.status(404).json({ message: "Question not found" });

    await Section.updateMany({}, { $pull: { questions: questionId } });

    res.status(200).json({ message: "Question deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
