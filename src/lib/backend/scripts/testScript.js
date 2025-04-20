// const mongoose = require("mongoose");
// const { Schema, model } = mongoose;

// // Define Chapter schema
// const ChapterSchema = new Schema({
//   title: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   description: {
//     type: String,
//     required: true,
//     trim: true,
//   },
// });

// // Define Subject schema
// const SubjectSchema = new Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     description: {
//       type: String,
//       required: true,
//     },
//     chapters: {
//       type: [ChapterSchema],
//       default: [],
//     },
//     vectorStoreID: {
//       type: String,
//       default: "",
//     },
//     grade: {
//       type: Number,
//       required: true,
//     },
//     imageUrl: {
//       type: String,
//       default: "/api/placeholder/400/300",
//     },
//   },
//   { timestamps: true }
// );

// // Create Subject model
// const Subject = model("Subject", SubjectSchema);

// async function main() {
//   try {
//     await mongoose.connect("mongodb://localhost:27017/revision-lm");
//     console.log("Connected to MongoDB ✅");

//     const dummySubject = new Subject({
//       name: "Science",
//       description:
//         "Explore the wonders of science for 7th grade, covering topics from biology, chemistry, and physics with engaging chapters.",
//       chapters: [
//         {
//           title: "Chapter 1: Nutrition in Plants",
//           description: "Learn about how plants make and use food.",
//         },
//         {
//           title: "Chapter 2: Nutrition in Animals",
//           description:
//             "Understand the process of nutrition in various animals.",
//         },
//         {
//           title: "Chapter 3: Fibre to Fabric",
//           description: "Discover how fibres are converted into fabrics.",
//         },
//         {
//           title: "Chapter 4: Heat",
//           description: "Study the concept of heat and its effects.",
//         },
//         {
//           title: "Chapter 5: Acids, Bases and Salts",
//           description:
//             "Explore the properties and uses of acids, bases, and salts.",
//         },
//         {
//           title: "Chapter 6: Physical and Chemical Changes",
//           description: "Differentiate between physical and chemical changes.",
//         },
//         {
//           title: "Chapter 7: Weather, Climate and Adaptations",
//           description: "Examine weather, climate, and how organisms adapt.",
//         },
//         {
//           title: "Chapter 8: Winds, Storms and Cyclones",
//           description:
//             "Understand the causes and effects of winds, storms, and cyclones.",
//         },
//         {
//           title: "Chapter 9: Soil",
//           description: "Learn about soil types, properties, and conservation.",
//         },
//         {
//           title: "Chapter 10: Respiration in Organisms",
//           description: "Study how different organisms respire.",
//         },
//         {
//           title: "Chapter 11: Transportation in Animals and Plants",
//           description: "Explore how nutrients and water are transported.",
//         },
//         {
//           title: "Chapter 12: Reproduction in Plants",
//           description: "Understand the process of reproduction in plants.",
//         },
//         {
//           title: "Chapter 13: Motion and Time",
//           description:
//             "Learn about the concepts of motion and measurement of time.",
//         },
//       ],
//       vectorStoreID: "vs_67e362f8936881919adb41714537d98c",
//       grade: 7,
//       imageUrl: "/subject_images/seven_science.png",
//     });

//     await dummySubject.save();
//     console.log("Dummy subject uploaded successfully 🚀");
//   } catch (error) {
//     console.error("Error uploading subject:", error);
//   } finally {
//     await mongoose.disconnect();
//     console.log("Disconnected from MongoDB 🔌");
//   }
// }

// main();
