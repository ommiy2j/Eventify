const getServerData = (refId) => {
  const reference_id = refId;
  fetch("http://localhost:8000/api/server/currentserver", {
    method: "POST",
    body: JSON.stringify({
      reference_id,
    }),
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": localStorage.getItem("token"),
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((result) => {
      console.log(result);
      localStorage.setItem("myEvent", JSON.stringify(result));
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = { getServerData };
