import { useState } from "react";
import { motion } from "framer-motion";
import { UploadCloud, CheckCircle, XCircle, Trophy } from "lucide-react";

export default function FoulDetectionApp() {
  const [video, setVideo] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setVideo(file);
    setLoading(true);

    // Simulate an AI analysis with a random result after 2s
    setTimeout(() => {
      setResult(Math.random() > 0.5 ? "Flop" : "Foul");
      setLoading(false);
    }, 2000);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        // Green gradient background
        background: "linear-gradient(135deg, #2D2A26 40%, #817144 60%)",
        position: "relative",
        overflow: "hidden",
        padding: "16px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Inline CSS for animations and button hover effects */}
      <style>{`
        /* Keyframes for up-down float */
        @keyframes float {
          0% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0); }
        }

        /* Keyframes for drifting horizontally */
        @keyframes drift {
          0% { transform: translateX(0); }
          50% { transform: translateX(30px); }
          100% { transform: translateX(0); }
        }

        .soccer-ball-bg {
            position: absolute;
            border-radius: 50%;
            background: radial-gradient(
                circle at center,
                rgba(128,0,10, 0.5) 0%,   /* Brighter center */
                rgba(128,0,10, 0.3) 40%,  /* Mid-tone */
                rgba(128,0,10, 0) 30%    /* Fully transparent at the edges */
            );
            animation: float 6s ease-in-out infinite, drift 10s ease-in-out infinite;
            pointer-events: none;
        }

        /* Modern hover animation for buttons */
        .fancy-button {
          margin-top: 20px;
          background: linear-gradient(135deg, #568203 0%, #8F9779 100%);
          color: #ffffff;
          font-weight: 600;
          padding: 10px 20px;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          font-size: clamp(14px, 2vw, 16px);
          backdrop-filter: blur(6px);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .fancy-button:hover {
          transform: scale(1.05);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }
        .fancy-button:active {
          transform: scale(0.98);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }
      `}</style>

    {/* Floating "soccer ball" backgrounds */}
    {[...Array(10)].map((_, index) => {
    // Create a random size between 80 and 180 pixels
    const size = 80 + Math.random() * 100;
    // Random top and left positions spread more across the screen
    const topPos = Math.random() * 90;
    const leftPos = Math.random() * 90;
    return (
        <div
        key={index}
        className="soccer-ball-bg"
        style={{
            width: `${size}px`,
            height: `${size}px`,
            top: `${topPos}%`,
            left: `${leftPos}%`,
            animationDelay: `${index * 0.2}s`, // Slightly shorter delays for more dynamic pops
        }}
        ></div>
    );
    })}

      <h1
        style={{
          fontSize: "clamp(24px, 4vw, 36px)",
          fontWeight: "bold",
          marginBottom: "24px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          color: "#ffffff",
          textAlign: "center",
          zIndex: 2,
        }}
      >
        <Trophy style={{ width: "32px", height: "32px", color: "#F7D82F" }} /> Soccer Foul Detection
      </h1>

      {/* Upload Section (Gradient Glass) */}
      <div
        style={{
            width: "100%",
            maxWidth: "700px",
            background: "linear-gradient(135deg, rgba(161,144,96, 0.4), rgba(161,144,96, 0.3))",
            borderRadius: "16px",
            padding: "24px",
            border: "1px solid rgba(255, 255, 255, 0.4)",
            backdropFilter: "blur(30px) saturate(150%)",
            WebkitBackdropFilter: "blur(30px) saturate(150%)",
            boxShadow: "0 16px 40px rgba(0, 0, 0, 0.5)",
            zIndex: 2,
        }}
      >
        {!video ? (
          <label
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              border: "2px dashed rgba(255,255,255,0.4)",
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              borderRadius: "12px",
              width: "100%",
              minHeight: "180px",
              cursor: "pointer",
              textAlign: "center",
              transition: "all 0.3s ease",
            }}
          >
            <UploadCloud style={{ width: "50px", height: "50px", color: "#A19060" }} />
            <span
              style={{
                color: "#A19060",
                marginTop: "12px",
                fontSize: "clamp(12px, 2vw, 16px)",
              }}
            >
              Click or drag a video file here to upload
            </span>
            <input type="file" accept="video/*" style={{ display: "none" }} onChange={handleUpload} />
          </label>
        ) : (
          <motion.div
            style={{ width: "100%", textAlign: "center" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <video
              src={URL.createObjectURL(video)}
              controls
              style={{
                width: "100%",
                maxHeight: "400px",
                borderRadius: "12px",
                marginBottom: "16px",
                border: "2px solid rgba(255, 255, 255, 0.2)",
                objectFit: "contain",
              }}
            />
            {loading ? (
              <p style={{ fontSize: "16px", fontWeight: "600", color: "#F7D82F" }}>Analyzing...</p>
            ) : (
              result && (
                <div style={{ marginTop: "16px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "10px",
                      flexWrap: "wrap",
                    }}
                  >
                    {result === "Flop" ? (
                      <XCircle style={{ width: "30px", height: "30px", color: "#ff6b6b" }} />
                    ) : (
                      <CheckCircle style={{ width: "30px", height: "30px", color: "#4caf50" }} />
                    )}
                    <p
                      style={{
                        fontSize: "clamp(18px, 3vw, 24px)",
                        fontWeight: "bold",
                        color: result === "Flop" ? "#ff6b6b" : "#4caf50",
                      }}
                    >
                      {result}
                    </p>
                  </div>
                  <div
                    style={{
                      marginTop: "12px",
                      color: "#e0e0e0",
                      fontSize: "clamp(18px, 2vw, 14px)",
                    }}
                  >
                    <p style={{ fontStyle: "italic" }}>
                      [Reasoning for the result will be displayed here.]
                    </p>
                  </div>
                </div>
              )
            )}
            <button
              onClick={() => {
                setVideo(null);
                setResult(null);
              }}
              className="fancy-button"
            >
              Upload Another Video
            </button>
          </motion.div>
        )}
      </div>

      {/* How It Works Section (Gradient Glass) */}
      <section
        style={{
            width: "100%",
            maxWidth: "1000px",
            marginTop: "48px",
            background: "linear-gradient(135deg, rgba(161,144,96, 0.4), rgba(161,144,96, 0.3))",
            borderRadius: "16px",
            padding: "24px",
            border: "1px solid rgba(255, 255, 255, 0.4)",
            backdropFilter: "blur(30px) saturate(150%)",
            WebkitBackdropFilter: "blur(30px) saturate(150%)",
            boxShadow: "0 16px 40px rgba(0, 0, 0, 0.5)",
            zIndex: 2,
            marginBottom: "40px",
        }}
      >
        <h2
          style={{
            fontSize: "clamp(20px, 4vw, 28px)",
            fontWeight: "bold",
            color: "#ffffff",
            textAlign: "center",
            marginBottom: "24px",
          }}
        >
          How It Works
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <p style={{ fontSize: "clamp(14px, 2vw, 16px)", fontWeight: "600", color: "#e0e0e0" }}>
              Example of a Flop (No Skeleton)
            </p>
            <video
              src="/src/videos/flop.mp4"
              controls
              style={{
                width: "100%",
                height: "300px",
                borderRadius: "10px",
                marginTop: "8px",
                objectFit: "cover",
                backdropFilter: "blur(10px)",
              }}
            />
            <p
              style={{
                fontSize: "clamp(14px, 2vw, 16px)",
                fontWeight: "600",
                color: "#e0e0e0",
                marginTop: "10px",
              }}
            >
              Example of a Flop (With Skeleton)
            </p>
            <video
              src="/src/videos/sk_flop.mp4"
              controls
              style={{
                width: "100%",
                height: "300px",
                borderRadius: "10px",
                marginTop: "8px",
                objectFit: "cover",
                backdropFilter: "blur(10px)",
              }}
            />
          </div>

          <div style={{ textAlign: "center" }}>
            <p style={{ fontSize: "clamp(14px, 2vw, 16px)", fontWeight: "600", color: "#e0e0e0" }}>
              Example of a Real Foul (No Skeleton)
            </p>
            <video
              src="/src/videos/real_foul.mp4"
              controls
              style={{
                width: "100%",
                height: "300px",
                borderRadius: "10px",
                marginTop: "8px",
                objectFit: "cover",
                backdropFilter: "blur(10px)",
              }}
            />
            <p
              style={{
                fontSize: "clamp(14px, 2vw, 16px)",
                fontWeight: "600",
                color: "#e0e0e0",
                marginTop: "10px",
              }}
            >
              Example of a Real Foul (With Skeleton)
            </p>
            <video
              src="/src/videos/foul1_skeleton.mp4"
              controls
              style={{
                width: "100%",
                height: "300px",
                borderRadius: "10px",
                marginTop: "8px",
                objectFit: "cover",
                backdropFilter: "blur(10px)",
              }}
            />
          </div>
        </div>
        <div
          style={{
            marginTop: "24px",
            textAlign: "center",
            color: "#e0e0e0",
            fontStyle: "italic",
            fontSize: "clamp(18px, 2vw, 14px)",
          }}
        >
          [Description of how it works will be added here.]
        </div>
      </section>
    </div>
  );
}
