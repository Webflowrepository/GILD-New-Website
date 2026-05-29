import { ImageResponse } from "next/og";
import React from "react";

export const runtime = "edge";

export function GET() {
  return new ImageResponse(
    React.createElement(
      "div",
      {
        style: {
          background: "#1B2632",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "sans-serif",
        },
      },
      React.createElement(
        "div",
        {
          style: {
            color: "#FFFFFF",
            fontSize: 92,
            fontWeight: "bold",
            letterSpacing: "-2px",
            lineHeight: 1,
          },
        },
        "GILD"
      ),
      React.createElement(
        "div",
        {
          style: {
            color: "#D8E0E8",
            fontSize: 34,
            marginTop: 28,
            lineHeight: 1.3,
            maxWidth: 800,
          },
        },
        "Invite-only network for AI and engineering leaders."
      ),
      React.createElement(
        "div",
        {
          style: {
            color: "#5DB5B5",
            fontSize: 26,
            marginTop: 18,
            letterSpacing: "0.04em",
          },
        },
        "Austin · Dallas · Miami"
      )
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
