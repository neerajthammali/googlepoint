import React from 'react';
// @ts-ignore
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Shop from './pages/Shop';
import Assistant from './pages/Assistant';
import Forum from './pages/Forum';
import ForumTopicDetail from './pages/ForumTopic';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/forum/:id" element={<ForumTopicDetail />} />
          <Route path="/assistant" element={<Assistant />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;