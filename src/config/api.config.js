const API_URL = 'http://localhost:5000'; // Base URL for all APIs

const api = {
  users: {
    getAllUsers: `${API_URL}/users`,
    getUserById: (id) => `${API_URL}/users/${id}`,
    updateUser:  (id) => `${API_URL}/users/${id}`,
  },
  auth: {
    signUp: `${API_URL}/users`,
    login: `${API_URL}/users`,
  },
  post: {
    getAllPosts: `${API_URL}/posts`,
    createPost: `${API_URL}/posts`,
    deletePost: (id) => `${API_URL}/posts/${id}`,
    getUserPosts: (userId) => `${API_URL}/posts?user_id=${userId}`,
  },
  comment: {
    getAllComments: `${API_URL}/comments`,
    getComment: (id) => `${API_URL}/comments/${id}`,
    createComment: `${API_URL}/comments`,
    updateComment: (id) => `${API_URL}/comments/${id}`,
    deleteComment: (id) => `${API_URL}/comments/${id}`,
    getCommentsForPost: (postId) => `${API_URL}/comments?post_id=${postId}`,
  },
};

export default api;
