import React from 'react';
import moment from "moment";
import stubs from "../stubs";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "./Compiler.css";

const Compiler = () => {

  const navigate = useNavigate();

  const [code, setCode] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState("cpp");
  const [jobId, setJobId] = useState(null);
  const [status, setStatus] = useState(null);
  const [jobDetails, setJobDetails] = useState(null);

  useEffect(() => {
    setCode(stubs[language]);
  }, [language]);

  useEffect(() => {
    const defaultLang = localStorage.getItem("default-language") || "cpp";
    setLanguage(defaultLang);
  }, []);

  let pollInterval;

  const handleSubmit = async () => {
    const payload = {
      language,
      code,
      input,
    };
    try {
      setOutput("");
      setStatus(null);
      setJobId(null);
      setJobDetails(null);
      const { data } = await axios.post("http://localhost:5000/api/v1/run", payload);
      if (data.jobId) {
        setJobId(data.jobId);
        setStatus("Submitted.");
        setOutput(`${data.output}`);
        console.log(output);

        // poll here
        // pollInterval = setInterval(async () => {
        const { data: statusRes } = await axios.get(
          `http://localhost:5000/api/v1/status`,
          {
            params: {
              id: data.jobId,
            },
          }
        );
        const { success, job, error, runStatus } = statusRes;
        console.log(statusRes);
        if (success === true) {

          const { status: jobStatus, output: jobOutput } = job;
          setStatus(runStatus);
          setJobDetails(job);

          if (jobStatus === "pending") return;
          setOutput(jobOutput);

          clearInterval(pollInterval);
        } else {
          console.error(error);
          setOutput(error);
          setStatus("Bad request");
          clearInterval(pollInterval);
        }
        // }, 1000);
      } else {
        setOutput("Retry again.");
      }
    } catch ({ response }) {
      if (response) {
        const errMsg = response.data.err.stderr;
        setStatus("failed");
        setOutput(errMsg);

        return;
      } else {
        setOutput("Please retry submitting.");
      }
    }
  };

  const setDefaultLanguage = () => {
    localStorage.setItem("default-language", language);
    console.log(`${language} set as default!`);
  };

  const renderTimeDetails = () => {
    if (!jobDetails) {
      return "";
    }
    let { submittedAt, startedAt, completedAt } = jobDetails;
    let result = "";
    submittedAt = moment(submittedAt).toString();
    result += `Submitted At: ${submittedAt}  `;
    // if (!startedAt || !completedAt) return result;
    const start = moment(startedAt);
    const end = moment(completedAt);
    const diff = end.diff(start, "miliseconds", true);

    result += `Execution Time: ${diff}s`;
    return result;
  };

  const logoutUser = async () => {
    try {

      await axios.get(`http://localhost:5000/api/v1/logout`);
      navigate("/");

    } catch (error) {
      navigate("/compiler");
    }
  }
  return (
    <div className="App">
      <h1>Judge0 Compiler</h1>
      <div className='logBtn'>
        <button onClick={logoutUser}>Logout</button>
      </div>
      <div>
        <label>Language:</label>
        <select
          value={language}
          onChange={(e) => {
            const shouldSwitch = window.confirm(
              "Are you sure you want to change language? WARNING: Your current code will be lost."
            );
            if (shouldSwitch) {
              setLanguage(e.target.value);
            }
          }}
        >
          <option value="cpp">C++</option>
          <option value="py">Python</option>
        </select>
      </div>
      <br />
      <div>
        <button onClick={setDefaultLanguage}>Set Default</button>
      </div>
      <br />
      <div className="boxes">
        <div className="box1">
          <h3>Source Code</h3>
          <textarea
            rows="20"
            cols="75"
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
            }}
          ></textarea>
          <br />
        </div>
        <div className="box2">
          <h3>Input</h3>
          <textarea
            rows="10"
            cols="30"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
          ></textarea>
        </div>
      </div>

      <br />
      <button onClick={handleSubmit}>Submit</button>
      <p>{status}</p>
      <p>{jobId ? `Submission ID: ${jobId}` : ""}</p>
      <p>{renderTimeDetails()}</p>
      <h3>Output</h3>
      <textarea rows="20" cols="60" value={output}></textarea>
    </div>
  );
}

export default Compiler
