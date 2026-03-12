import { createReadStream, existsSync } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, join, normalize, resolve } from "node:path";

const port = Number(process.argv[2] || 4174);
const root = resolve("dist");
const allowedOrigins = new Set([
  "https://www.owlbear.rodeo",
  "https://owlbear.rodeo",
  "https://www.owlbear.app",
  "https://owlbear.app"
]);

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8"
};

function getCorsHeaders(request) {
  const origin = request.headers.origin;
  if (origin && allowedOrigins.has(origin)) {
    return {
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Vary": "Origin"
    };
  }

  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  };
}

function getFilePath(urlPath) {
  const safePath = normalize(decodeURIComponent(urlPath)).replace(/^([.][.][\\/])+/, "");
  const candidate = resolve(join(root, safePath === "/" ? "index.html" : safePath.replace(/^\//, "")));
  if (!candidate.startsWith(root)) {
    return null;
  }
  return candidate;
}

const server = createServer(async (request, response) => {
  const corsHeaders = getCorsHeaders(request);

  if (request.method === "OPTIONS") {
    response.writeHead(204, corsHeaders);
    response.end();
    return;
  }

  const filePath = getFilePath(request.url || "/");
  if (!filePath || !existsSync(filePath)) {
    response.writeHead(404, {
      ...corsHeaders,
      "Content-Type": "text/plain; charset=utf-8"
    });
    response.end("Not found");
    return;
  }

  const info = await stat(filePath);
  const finalPath = info.isDirectory() ? join(filePath, "index.html") : filePath;
  const ext = extname(finalPath).toLowerCase();
  response.writeHead(200, {
    ...corsHeaders,
    "Content-Type": mimeTypes[ext] || "application/octet-stream",
    "Cache-Control": "no-store"
  });
  createReadStream(finalPath).pipe(response);
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Atormentadas local server running at http://localhost:${port}`);
});
