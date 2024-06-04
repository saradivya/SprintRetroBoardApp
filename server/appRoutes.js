const getSprintRetroBoards = {
  target: "https://sprintretroapp.onrender.com",
  changeOrigin: true,
  ws: true,
  secure: false,
  pathRewrite(path, req) {
    return path.replace("/api/sprint/retroBoard", "/sprint/retroBoard");
  },
};

exports.getSprintRetroBoards = getSprintRetroBoards;
