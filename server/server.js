const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
const PORT = 3000;

// 中间件：允许跨域 + 解析 JSON 请求体
app.use(cors());
app.use(express.json());


// 统一的成功响应格式：{ code, message, data }
function ok(res, data, message = '操作成功', code = 200) {
  return res.status(code).json({ code, message, data });
}

// 统一的错误响应格式：{ code, message, data }，data 为 null
function fail(res, message, code = 400) {
  return res.status(code).json({ code, message, data: null });
}

// GET /：根路径欢迎接口，返回统一结构的 JSON
app.get('/', (req, res) => {
  ok(res, { time: new Date().toISOString() }, '个人主页后端服务运行正常');
});

// GET /api/articles：查询所有文章
app.get('/api/articles', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, title, content, created_at FROM articles ORDER BY created_at DESC'
    );
    ok(res, rows, rows.length > 0 ? '查询成功' : '暂无数据');
  } catch (err) {
    console.error('查询文章失败：', err);
    fail(res, '服务器内部错误', 500);
  }
});

// GET /api/articles/:id：查询单篇文章
app.get('/api/articles/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      return fail(res, '无效的文章 ID', 400);
    }
    const [rows] = await pool.query('SELECT id, title, content, created_at FROM articles WHERE id = ?', [id]);
    if (rows.length === 0) {
      return fail(res, '文章不存在', 404);
    }
    ok(res, rows[0], '查询成功');
  } catch (err) {
    console.error('查询文章失败：', err);
    fail(res, '服务器内部错误', 500);
  }
});

// GET /api/projects：查询所有项目
app.get('/api/projects', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, name, `desc`, status, tags FROM projects'
    );
    ok(res, rows, rows.length > 0 ? '查询成功' : '暂无数据');
  } catch (err) {
    console.error('查询项目失败：', err);
    fail(res, '服务器内部错误', 500);
  }
});

// GET /api/projects/:id：查询单个项目
app.get('/api/projects/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      return fail(res, '无效的项目 ID', 400);
    }
    const [rows] = await pool.query('SELECT id, name, `desc`, status, tags FROM projects WHERE id = ?', [id]);
    if (rows.length === 0) {
      return fail(res, '项目不存在', 404);
    }
    ok(res, rows[0], '查询成功');
  } catch (err) {
    console.error('查询项目失败：', err);
    fail(res, '服务器内部错误', 500);
  }
});

// POST /api/articles：新增文章
app.post('/api/articles', async (req, res) => {
  try {
    const { title, content } = req.body || {};
    if (!title || !content) {
      return fail(res, '标题和内容不能为空', 400);
    }
    const [result] = await pool.query(
      'INSERT INTO articles (title, content) VALUES (?, ?)',
      [title, content]
    );
    ok(res, { id: result.insertId, title, content }, '创建成功', 201);
  } catch (err) {
    console.error('新增文章失败：', err);
    fail(res, '服务器内部错误', 500);
  }
});

// PUT /api/articles/:id：更新文章（改）
app.put('/api/articles/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      return fail(res, '无效的文章 ID', 400);
    }
    const { title, content } = req.body || {};
    if (!title || !content) {
      return fail(res, '标题和内容不能为空', 400);
    }
    const [result] = await pool.query(
      'UPDATE articles SET title = ?, content = ? WHERE id = ?',
      [title, content, id]
    );
    if (result.affectedRows === 0) {
      return fail(res, '文章不存在', 404);
    }
    ok(res, { id, title, content }, '更新成功');
  } catch (err) {
    console.error('更新文章失败：', err);
    fail(res, '服务器内部错误', 500);
  }
});

// DELETE /api/articles/:id：删除文章
app.delete('/api/articles/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      return fail(res, '无效的文章 ID', 400);
    }
    const [result] = await pool.query('DELETE FROM articles WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return fail(res, '文章不存在', 404);
    }
    ok(res, null, '删除成功');
  } catch (err) {
    console.error('删除文章失败：', err);
    fail(res, '服务器内部错误', 500);
  }
});

// POST /api/projects：新增项目
app.post('/api/projects', async (req, res) => {
  try {
    const { name, desc, status, tags } = req.body || {};
    if (!name) {
      return fail(res, '项目名称不能为空', 400);
    }
    const tagsStr = Array.isArray(tags)
      ? tags.join(',')
      : tags || '';
    const [result] = await pool.query(
      'INSERT INTO projects (name, `desc`, status, tags) VALUES (?, ?, ?, ?)',
      [name, desc || '', status || '进行中', tagsStr]
    );
    ok(res, { id: result.insertId, name, desc: desc || '', status: status || '进行中', tags: tagsStr }, '创建成功', 201);
  } catch (err) {
    console.error('新增项目失败：', err);
    fail(res, '服务器内部错误', 500);
  }
});

// PUT /api/projects/:id：更新项目（改）
app.put('/api/projects/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      return fail(res, '无效的项目 ID', 400);
    }
    const { name, desc, status, tags } = req.body || {};
    if (!name) {
      return fail(res, '项目名称不能为空', 400);
    }
    const tagsStr = Array.isArray(tags)
      ? tags.join(',')
      : tags || '';
    const [result] = await pool.query(
      'UPDATE projects SET name = ?, `desc` = ?, status = ?, tags = ? WHERE id = ?',
      [name, desc || '', status || '进行中', tagsStr, id]
    );
    if (result.affectedRows === 0) {
      return fail(res, '项目不存在', 404);
    }
    ok(res, { id, name, desc: desc || '', status: status || '进行中', tags: tagsStr }, '更新成功');
  } catch (err) {
    console.error('更新项目失败：', err);
    fail(res, '服务器内部错误', 500);
  }
});

// DELETE /api/projects/:id：删除项目
app.delete('/api/projects/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      return fail(res, '无效的项目 ID', 400);
    }
    const [result] = await pool.query('DELETE FROM projects WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return fail(res, '项目不存在', 404);
    }
    ok(res, null, '删除成功');
  } catch (err) {
    console.error('删除项目失败：', err);
    fail(res, '服务器内部错误', 500);
  }
});

// 启动服务
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
  // 测试数据库连接：启动时执行一次简单查询，成功则打印连通提示
  testDatabaseConnection();
});

// 测试 MySQL 连接是否成功
async function testDatabaseConnection() {
  try {
    const [rows] = await pool.query('SELECT 1 AS ok');
    console.log(`MySQL 连接成功，测试查询返回: ${rows[0].ok}`);
  } catch (err) {
    console.error('MySQL 连接失败：', err.message);
  }
}