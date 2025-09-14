(() => {
  console.log("Gaza extension script loaded");

  // ===== Fixed area constants =====
  const MALMO_AREA_KM2 = 156.95; // Malmö Kommun area in km²
  const MALMO_POPULATION = 366803; // Malmö population
  const GAZA_AREA_KM2 = 42; // Gaza encampment area in km²
  const GAZA_POPULATION = 2_000_000; // Gaza population
  const MALMO_DOTS = MALMO_POPULATION;

  // ===== Early toggle-off if already active =====
  if (window.__gazaVisualizationActive) {
    window.__gazaVisualizationActive = false;
    try {
      // Remove visualization overlay
      const visualization = document.getElementById("__gaza-visualization");
      if (visualization) {
        // Clean up resize listener
        if (visualization._cleanupResize) {
          visualization._cleanupResize();
        }
        visualization.remove();
      }

      // Restore original window size
      const originalSize = document.documentElement.getAttribute("data-gaza-original-size");
      if (originalSize) {
        const size = JSON.parse(originalSize);
        window.resizeTo(size.width, size.height);
        document.documentElement.removeAttribute("data-gaza-original-size");
      }
    } catch (e) {
      console.error("Error removing visualization:", e);
    }
    return;
  }
  window.__gazaVisualizationActive = true;

  // ===== Create simultaneous visualization =====
  function createSimultaneousVisualization() {
    const overlay = document.createElement("div");
    overlay.id = "__gaza-visualization";
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      pointer-events: none;
      z-index: 2147483646;
      background: transparent;
      font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif;
    `;

    // Create single canvas for both populations
    const canvas = document.createElement("canvas");
    canvas.id = "__population-canvas";
    canvas.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      pointer-events: none;
      mix-blend-mode: difference;
    `;

    // Add labels
    const malmoLabel = document.createElement("div");
    malmoLabel.id = "__malmo-label";
    malmoLabel.style.cssText = `
      position: absolute;
      top: 20px;
      left: 20px;
      background: rgba(255, 255, 255, 0.9);
      color: black;
      padding: 15px 20px;
      border-radius: 8px;
      font-weight: 600;
      font-size: 16px;
      pointer-events: all;
      z-index: 10;
      border: 2px solid #333;
    `;
    malmoLabel.innerHTML = `
      <div>MALMÖ KOMMUN</div>
      <div style="font-size: 14px; opacity: 0.8; margin-top: 5px;">${MALMO_POPULATION.toLocaleString()} people</div>
      <div style="font-size: 14px; opacity: 0.8;">${MALMO_AREA_KM2} km²</div>
      <div style="font-size: 12px; opacity: 0.6; margin-top: 5px;">White dots = people</div>
      <div style="font-size: 10px; opacity: 0.5; margin-top: 8px;">
        <a href="https://sv.wikipedia.org/wiki/Malm%C3%B6_kommun" 
           target="_blank" 
           style="color: #666; text-decoration: none;">
          Source: Wikipedia
        </a>
      </div>
    `;

    const gazaLabel = document.createElement("div");
    gazaLabel.id = "__gaza-label";
    gazaLabel.style.cssText = `
      position: absolute;
      top: 20px;
      right: 20px;
      background: rgba(0, 0, 0, 0.9);
      color: white;
      padding: 15px 20px;
      border-radius: 8px;
      font-weight: 600;
      font-size: 16px;
      pointer-events: all;
      z-index: 10;
      border: 2px solid #ff0000;
    `;
    gazaLabel.innerHTML = `
      <div>GAZA ENCAMPMENT</div>
      <div style="font-size: 14px; opacity: 0.8; margin-top: 5px;">${GAZA_POPULATION.toLocaleString()} people</div>
      <div style="font-size: 14px; opacity: 0.8;">${GAZA_AREA_KM2} km² (26.8% of Malmö)</div>
      <div style="font-size: 12px; opacity: 0.6; margin-top: 5px;">Black dots in red area</div>
      <div style="font-size: 10px; opacity: 0.5; margin-top: 8px;">
        <a href="https://www.dn.se/varlden/israel-tvangsforflyttar-alla-i-gaza-stad-till-ett-redan-overbefolkat-omrade/" 
           target="_blank" 
           style="color: #ff6666; text-decoration: none;">
          Source: DN.se
        </a>
      </div>
    `;

    // Assemble the visualization
    overlay.appendChild(canvas);
    overlay.appendChild(malmoLabel);
    overlay.appendChild(gazaLabel);

    document.body.appendChild(overlay);

    // Set up canvas for full screen
    const dpr = Math.max(1, window.devicePixelRatio || 1);
    const width = window.innerWidth;
    const height = window.innerHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";

    const ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Draw both populations
    drawBothPopulations(ctx, width, height);

    // Add responsive functionality
    addResponsiveFunctionality(canvas, malmoLabel, gazaLabel);

    return overlay;
  }

  // ===== Draw both populations simultaneously =====
  function drawBothPopulations(ctx, width, height) {
    // First draw Malmö dots across the full screen
    drawMalmoDots(ctx, width, height);

    // Then draw Gaza dots in the smaller area
    drawGazaDots(ctx, width, height);
  }

  // ===== Draw Malmö dots =====
  function drawMalmoDots(ctx, width, height) {
    let drawnDots = 0;

    function drawBatch() {
      const startTime = performance.now();

      while (drawnDots < MALMO_DOTS && performance.now() - startTime < 16) {
        const x = Math.random() * width;
        const y = Math.random() * height;

        ctx.fillStyle = "rgba(255, 255, 255, 0.9)"; // White dots for Malmö
        ctx.fillRect(x, y, 1, 1);

        drawnDots++;
      }

      if (drawnDots < MALMO_DOTS) {
        requestAnimationFrame(drawBatch);
      } else {
        console.log(`Malmö dots complete: ${drawnDots.toLocaleString()} people`);
      }
    }

    drawBatch();
  }

  // ===== Draw Gaza dots =====
  function drawGazaDots(ctx, width, height) {
    // Calculate Gaza area as proportion of Malmö area
    // Gaza: 42 km², Malmö: 156.95 km²
    const gazaAreaRatio = GAZA_AREA_KM2 / MALMO_AREA_KM2;
    const gazaWidth = Math.floor(width * Math.sqrt(gazaAreaRatio));
    const gazaHeight = Math.floor(height * Math.sqrt(gazaAreaRatio));

    // Calculate Gaza area position (centered)
    const gazaX = Math.floor((width - gazaWidth) / 2);
    const gazaY = Math.floor((height - gazaHeight) / 2);

    // Draw Gaza area border
    ctx.strokeStyle = "rgba(255, 0, 0, 0.8)";
    ctx.lineWidth = 3;
    ctx.strokeRect(gazaX, gazaY, gazaWidth, gazaHeight);

    // Add Gaza label
    ctx.fillStyle = "rgba(255, 0, 0, 0.9)";
    ctx.font = "bold 16px Arial";
    ctx.fillText("GAZA ENCAMPMENT", gazaX + 10, gazaY + 20);

    // Calculate dots for Gaza area only (2M people in smaller area)
    const gazaDotsForArea = GAZA_POPULATION;

    console.log(`Gaza area: ${gazaWidth}x${gazaHeight}px (${(gazaAreaRatio * 100).toFixed(1)}% of screen)`);
    console.log(`Drawing ${gazaDotsForArea.toLocaleString()} dots in Gaza area`);

    let drawnDots = 0;

    function drawBatch() {
      const startTime = performance.now();

      while (drawnDots < gazaDotsForArea && performance.now() - startTime < 16) {
        // Only draw dots within Gaza area
        const x = gazaX + Math.random() * gazaWidth;
        const y = gazaY + Math.random() * gazaHeight;

        ctx.fillStyle = "rgba(0, 0, 0, 0.9)"; // Black dots for Gaza
        ctx.fillRect(x, y, 1, 1);

        drawnDots++;
      }

      if (drawnDots < gazaDotsForArea) {
        requestAnimationFrame(drawBatch);
      } else {
        console.log(`Gaza dots complete: ${drawnDots.toLocaleString()} dots in ${gazaAreaRatio.toFixed(3)} of screen area`);
      }
    }

    drawBatch();
  }

  // ===== Add responsive functionality =====
  function addResponsiveFunctionality(canvas, malmoLabel, gazaLabel) {
    let resizeTimeout;

    function handleResize() {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        console.log("Window resized, redrawing visualization");

        // Get new dimensions
        const dpr = Math.max(1, window.devicePixelRatio || 1);
        const width = window.innerWidth;
        const height = window.innerHeight;

        // Resize canvas
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = width + "px";
        canvas.style.height = height + "px";

        // Update context
        const ctx = canvas.getContext("2d");
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        // Redraw both populations
        drawBothPopulations(ctx, width, height);

        console.log("Visualization redrawn for new dimensions:", width, "x", height);
      }, 250); // Debounce resize events
    }

    // Add resize listener
    window.addEventListener("resize", handleResize);

    // Store cleanup function on the overlay
    const overlay = document.getElementById("__gaza-visualization");
    if (overlay) {
      overlay._cleanupResize = () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }

  // ===== Initialize visualization =====
  function initializeVisualization() {
    try {
      console.log("Initializing Malmö vs Gaza simultaneous visualization");

      // Store original window size
      const originalSize = {
        width: window.outerWidth,
        height: window.outerHeight,
      };
      document.documentElement.setAttribute("data-gaza-original-size", JSON.stringify(originalSize));

      // Create simultaneous visualization
      createSimultaneousVisualization();

      console.log("Visualization complete!");
      console.log(`Malmö: ${MALMO_POPULATION.toLocaleString()} people in ${MALMO_AREA_KM2} km²`);
      console.log(`Gaza: ${GAZA_POPULATION.toLocaleString()} people in ${GAZA_AREA_KM2} km²`);
      console.log(
        `Density ratio: Gaza is ${GAZA_POPULATION / GAZA_AREA_KM2 / (MALMO_POPULATION / MALMO_AREA_KM2).toFixed(1)}x more dense than Malmö`
      );
    } catch (error) {
      console.error("Error initializing visualization:", error);
    }
  }

  // ===== Start the process =====
  console.log("Starting Malmö vs Gaza simultaneous visualization");
  initializeVisualization();
})();
