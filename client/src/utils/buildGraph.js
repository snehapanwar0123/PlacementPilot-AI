export function buildGraph(
  roadmap,
  expandedCategories,
  toggleCategory,
  setSelectedTopic
) {
  const nodes = [];
  const edges = [];

  const centerX = 600;
  const centerY = 350;

  // Root node
  nodes.push({
    id: "goal",
    type: "root",
    position: {
      x: centerX,
      y: centerY,
    },
    data: {
      label: roadmap.role,
    },
  });

  const categoryRadius = 300;
  const totalCategories = roadmap.sections.length;

  roadmap.sections.forEach((section, index) => {
    const categoryId = `section-${index}`;

    const angle = (2 * Math.PI * index) / totalCategories;

    const categoryX = centerX + categoryRadius * Math.cos(angle);
    const categoryY = centerY + categoryRadius * Math.sin(angle);

    nodes.push({
      id: categoryId,
      type: "category",
      position: {
        x: categoryX,
        y: categoryY,
      },
      data: {
        label: section.title,
        subtitle: `${section.topics.length} Topics`,
        expanded: expandedCategories.includes(categoryId),
        onClick: () => toggleCategory(categoryId),
      },
    });

    edges.push({
      id: `goal-${categoryId}`,
      source: "goal",
      target: categoryId,
      animated: true,
    });

    if (expandedCategories.includes(categoryId)) {
      const spacingX = 170;
      const spacingY = 120;
      const columns = 2;

      section.topics.forEach((topic, topicIndex) => {
        const row = Math.floor(topicIndex / columns);
        const col = topicIndex % columns;

        const topicX =
          categoryX + (col === 0 ? -spacingX / 2 : spacingX / 2);

        const topicY =
          categoryY + 160 + row * spacingY;

        const topicId = `${categoryId}-topic-${topicIndex}`;

        nodes.push({
          id: topicId,
          type: "topic",
          position: {
            x: topicX,
            y: topicY,
          },
          data: {
            label: topic.title,
            topic: topic.title,
            category: section.title,
            completed: topic.completed,
            estimatedHours: topic.estimatedHours,
            onClick: () => setSelectedTopic(topic.title),
          },
        });

        edges.push({
          id: `${categoryId}-${topicId}`,
          source: categoryId,
          target: topicId,
          animated: true,
        });
      });
    }
  });

  return {
    nodes,
    edges,
  };
}