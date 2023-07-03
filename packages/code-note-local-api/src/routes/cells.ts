import express from "express";
import fs from "fs/promises";
import path from "path";

interface CellProperties {
  id: string;
  data: string;
  type: "text" | "code";
}

export function createCellsRouter(filename: string, dir: string) {
  const router = express.Router();
  router.use(express.json());
  const fullPath = path.join(dir, filename);

  router.get("/cells", async (request, response) => {
    try {
      // Make sure the cell storage file exists
      const result = await fs.readFile(fullPath, { encoding: "utf-8" });

      // Parse a list of cells out of it
      // Send list of cells back to browser
      console.log("Result", JSON.parse(result));

      response.send({
        status: 200,
        cellList: JSON.parse(result), //parse list of cells from the file
        message: "Successfully fetched the cell list",
      });
    } catch (err: any) {
      // ENOENT = Error no entity. Inspect the error, see if it says that file doesn't exists
      if (err.code === "ENOENT") {
        //If it does not exists. add in a default list of cells
        await fs.writeFile(fullPath, "[]", "utf-8");
        response.send({
          status: 404,
          cellList: [],
          message: "File does not exists",
        });
      } else {
        // If read throws an error
        response.send({
          status: 500,
          cellList: [],
          message: err.message,
        });
        throw err;
      }
    }
  });

  router.post("/cells", async (request, response) => {
    // Take the list of cells from the request obj
    // serialize obj
    console.log(request.body);
    const { cells }: { cells: CellProperties[] } = request.body;

    // Write the cells into the file
    console.log(fullPath, cells);
    await fs.writeFile(fullPath, JSON.stringify(cells), "utf-8");

    response.send({ status: 200, message: "Success" });
  });

  return router;
}
