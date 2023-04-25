const apiCallStreamingResponse = (
  setData,
  setTtfb,
  setApiTime,
  setDdbItems
) => {
  let output = [];
  let tempChunk = "";
  const separator = "${Separator}";
  const apiStartTime = Date.now();

  fetch(
    "https://igvxeczeq7jnmbc6vdve4mw6vq0cupbf.lambda-url.ap-south-1.on.aws/",
    {
      method: "GET",
      redirect: "follow",
      responseType: "stream",
    }
  )
    .then((response) => {
      // Stream reader
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      return new ReadableStream({
        start(controller) {
          function push() {
            reader
              .read()
              .then(({ done, value }) => {
                // decode stream value
                let chunk = decoder.decode(new Uint8Array(value));

                // helper function to set the data
                const setTableData = () => {
                  if (output.length === 0) {
                    setTtfb((Date.now() - apiStartTime).toString() + " ms");
                  } //statistics

                  let result = JSON.parse(tempChunk); // assign
                  result.map((e) => (e.key = e.id)); // add key to avoid ant design's unique key error
                  output = output.concat(result); // add to previously loaded dataset
                  tempChunk = ""; // clear temp value to start next iteration
                  setData(output); // update data to refresh table
                  setDdbItems(output.length); //statistics
                };

                // identify separator and take action accordingly
                if (chunk.includes(separator)) {
                  //dataset 1 - ${separator}<stringData>${separator}
                  if (chunk.indexOf(separator) === 0) {
                    setTableData();
                    chunk = chunk.replace(separator, ""); // after this it becomes dataset 2
                  }
                  // dataset 2 - <stringData${separator}<stringData>${separator}
                  if (
                    chunk.endsWith(separator) &&
                    chunk.split(separator).length === 3
                  ) {
                    tempChunk += chunk.substring(0, chunk.indexOf(separator));
                    setTableData();
                  }
                  // dataset 3 - <stringData>${separator}
                  if (
                    chunk.endsWith(separator) &&
                    chunk.split(separator).length === 2
                  ) {
                    chunk = chunk.split(separator).filter((e) => e !== "");
                    tempChunk += chunk[0];
                    setTableData();
                    chunk = ""; // to avoid execution for dataset 4
                  }
                  // dataset 4 - <stringData${separator}<stringData>
                  if (chunk !== "") {
                    chunk = chunk.split(separator).filter((e) => e !== "");
                    tempChunk += chunk[0];
                    setTableData();
                    if (chunk.length > 1) tempChunk = chunk[1];
                  }
                }
                // if the separator does not exist, add it to temp chunk and continue the loop
                else tempChunk += chunk;

                // ending the iterative execution
                if (done) {
                  controller.close();
                  //statistics
                  setApiTime((Date.now() - apiStartTime).toString() + " ms");
                  return;
                }
                // iterate
                push();
              })
              .catch((error) => {
                console.error("Error reading response:", error);
                controller.error(error);
              });
          }
          push();
        },
      });
    })
    .catch((error) => console.log("api failed", error));
};

const apiCallRegularResponse = (setData, setTtfb, setApiTime, setDdbItems) => {
  const apiStartTime = Date.now();

  fetch("https://xvbk8vsrbi.execute-api.ap-south-1.amazonaws.com/prod/regular")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      setData(data);
      setTtfb((Date.now() - apiStartTime).toString() + " ms");
      setApiTime((Date.now() - apiStartTime).toString() + " ms");
      setDdbItems(data.length);
    })
    .catch((error) => console.log("api failed", error));
};

export { apiCallStreamingResponse, apiCallRegularResponse };
