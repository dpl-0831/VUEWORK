-- =====================================================
-- 数据库初始化脚本：my_homepage
-- 字符集：utf8mb4（支持中文 / emoji）
-- 适用版本：MySQL 5.7+ / 8.0+
-- 说明：脚本可重复执行（先 DROP 再 CREATE），适合初始化和重置
-- =====================================================

-- 1. 创建数据库
CREATE DATABASE IF NOT EXISTS my_homepage
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_unicode_ci;

USE my_homepage;

-- 2. 文章表
DROP TABLE IF EXISTS articles;
CREATE TABLE articles (
  id         INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  title      VARCHAR(255) NOT NULL                COMMENT '文章标题',
  content    TEXT                                 COMMENT '文章内容（支持 Markdown）',
  created_at TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (id),
  KEY idx_articles_created_at (created_at),
  KEY idx_articles_title (title(64))
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci COMMENT = '文章表';

-- 3. 项目表
DROP TABLE IF EXISTS projects;
CREATE TABLE projects (
  id     INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  name   VARCHAR(255) NOT NULL                COMMENT '项目名称',
  `desc` TEXT                                 COMMENT '项目描述',
  status VARCHAR(50)  NOT NULL DEFAULT '进行中' COMMENT '项目状态',
  tags   VARCHAR(255)                         COMMENT '标签，逗号分隔',
  PRIMARY KEY (id),
  KEY idx_projects_status (status)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci COMMENT = '项目表';

-- 4. 示例数据
INSERT INTO articles (title, content) VALUES
('我的第一篇博客', '这是我在个人主页上发表的第一篇文章，欢迎大家来访。'),
('Vue3 入门指南', '从响应式、组合式 API 到组件化开发，带你快速上手 Vue3。'),
('MySQL 使用笔记', '记录数据库日常开发中常用的建表、查询与优化技巧。');

INSERT INTO projects (name, `desc`, status, tags) VALUES
('个人主页', '基于 Vue3 + Vite 的个人主页项目，包含博客与作品展示。', '进行中', 'Vue3,TypeScript,Vite'),
('博客管理系统', '支持 Markdown 编辑、文章分类与标签管理的内容平台。', '已完成', 'Vue3,Node.js,MySQL'),
('待办清单', '一个简单易用的待办事项应用，支持本地持久化。', '待开发', 'Vue3,Pinia');
