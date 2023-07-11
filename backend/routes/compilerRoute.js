const express=require("express");
const {runCode,codeStatus}=require("../controllers/compilerController")


const router=express.Router();

router.route("/run").post(runCode);
router.route("/status").get(codeStatus);

module.exports=router;

// app.post("/run", async (req, res) => {
//     const { language , code,input } = req.body;
  
//     console.log(language, "Length:", code.length);
  
//     if (code === undefined) {
//       return res.status(400).json({ success: false, error: "Empty code body!" });
//     }
//     // need to generate a c++ file with content from the request
//     try{
//     const filepath = await generateFile(language, code);
    
//     let output;
//     if(language==="cpp"){
//       output=await executeCpp(filepath,input);
//     }
//     if(language==="py")
//     {
//       output=await executePy(filepath,input);
//     }
    
//     const job = await new Job({ language, filepath }).save();
//     const jobId = job["_id"];
//     addJobToQueue(jobId);
//     res.status(201).json({ filepath,output,jobId});
  
//     }catch(err){
//       res.status(500).json({err});
//     }
//   });
  
//   app.get("/status", async (req, res) => {
//     const jobId = req.query.id;
  
//     if (jobId === undefined) {
//       return res
//         .status(400)
//         .json({ success: false, error: "missing id query param" });
//     }
  
//     const job = await Job.findById(jobId);
  
//     if (job === undefined) {
//       return res.status(400).json({ success: false, error: "couldn't find job" });
//     }
  
//     return res.status(200).json({ success: true, runStatus: "success",job });
//   });
  