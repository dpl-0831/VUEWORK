<script setup>
defineProps({
  project: {
    type: Object,
    required: true
  },
  highlight: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <div class="project-card" :class="{ highlight }">
    <!-- 具名插槽：头部 -->
    <div class="card-header">
      <slot name="header">默认标题</slot>
    </div>

    <!-- 默认插槽：主体 -->
    <div class="card-body">
      <slot>默认内容</slot>
    </div>

    <!-- 具名插槽：底部 -->
    <div class="card-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<style scoped>
.project-card {
  background: #f8fafc;
  border-radius: 12px;
  padding: 18px;
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
}

.project-card.highlight {
  border-color: #4a90e2;
  box-shadow: 0 4px 16px rgba(74, 144, 226, 0.15);
}

.project-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

.card-header {
  font-size: 16px;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 8px;
}

.card-body {
  font-size: 14px;
  color: #64748b;
  line-height: 1.7;
  margin-bottom: 12px;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  color: #94a3b8;
}
</style>