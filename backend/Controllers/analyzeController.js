const Profile = require("../models/profile");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-3.5-flash",
});

const analyzeProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ userid: req.user.id });

    if (!profile) {
      return res.status(404).json({
        message: "Profile not found",
      });
    }

    const {
      education,
      college,
      graduationyear,
      targetrole,
      skills,
      projects,
    } = profile;

    const aiProfile = {
      education,
      college,
      graduationyear,
      targetrole,
      skills,
      projects,
    };

const prompt = `
You are an AI career mentor for software developers.

Analyze the developer profile below.

Rules:
- Use ONLY the information provided in the profile.
- Do not assume or invent any information.
- Do not mention GitHub, LinkedIn, portfolio links, or online presence.
- Do not evaluate college reputation or personal background.
- Focus only on technical skills, projects, and career growth.
- Keep answers short and practical.
- Each point should be one line only.
- Maximum 3 points in each section.
- Do not write long explanations.
- Do not end points with periods.
- Only suggest missing skills that are relevant to the target role.
- Make roadmap steps specific and actionable.
- Return ONLY valid JSON. Do not add markdown, code blocks, or extra text.

Required JSON format:

{
  "strengths": [
    "Short technical strength 1",
    "Short technical strength 2",
    "Short technical strength 3"
  ],
  "weaknesses": [
    "Short technical weakness 1",
    "Short technical weakness 2",
    "Short technical weakness 3"
  ],
  "missingSkills": [
    "Relevant skill 1",
    "Relevant skill 2",
    "Relevant skill 3"
  ],
  "careerRoadmap": [
    "Specific action step 1",
    "Specific action step 2",
    "Specific action step 3"
  ]
}

Developer Profile:

${JSON.stringify(aiProfile, null, 2)}
`;

    const result = await model.generateContent(prompt);

    const text = result.response.text();

    let analysis;

    try {
      analysis = JSON.parse(text);
    } catch (error) {
      return res.status(500).json({
        message: "AI returned invalid JSON",
        rawResponse: text,
      });
    }

    return res.status(200).json({
      analysis,
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { analyzeProfile };