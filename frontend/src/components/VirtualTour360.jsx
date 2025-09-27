"use client"

import { useEffect, useRef } from "react"

const VirtualTour360 = ({ tourUrl, pandalName }) => {
  const containerRef = useRef(null)

  useEffect(() => {
    if (tourUrl && containerRef.current) {
      // Initialize 360° viewer using A-Frame or similar library
      const script = document.createElement("script")
      script.src = "https://aframe.io/releases/1.4.0/aframe.min.js"
      script.onload = () => {
        initializeViewer()
      }
      document.head.appendChild(script)
    }
  }, [tourUrl])

  const initializeViewer = () => {
    if (containerRef.current) {
      containerRef.current.innerHTML = `
        <a-scene embedded style="height: 400px; width: 100%;">
          <a-sky src="${tourUrl}" rotation="0 -130 0"></a-sky>
          <a-text font="kelsonsans" value="${pandalName}" width="6" position="-2.5 0.25 -1.5"
                  color="#FFF"></a-text>
        </a-scene>
      `
    }
  }

  return (
    <div className="virtual-tour-360 bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
        <h3 className="text-lg font-semibold">360° Virtual Tour</h3>
        <p className="text-purple-100 text-sm">Drag to look around, scroll to zoom</p>
      </div>

      {tourUrl ? (
        <div ref={containerRef} className="relative">
          {/* A-Frame 360° viewer will be inserted here */}
        </div>
      ) : (
        <div className="h-64 flex items-center justify-center bg-gray-100">
          <div className="text-center">
            <div className="text-4xl mb-2">🏛️</div>
            <p className="text-gray-600">360° tour not available</p>
            <p className="text-sm text-gray-500">Check back later for virtual experience</p>
          </div>
        </div>
      )}

      <div className="p-4 bg-gray-50">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>Use mouse/touch to navigate</span>
          <button className="bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-600 transition-colors">
            Fullscreen
          </button>
        </div>
      </div>
    </div>
  )
}

export default VirtualTour360
