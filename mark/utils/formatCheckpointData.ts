interface PointData {
  stat: string;
  date: string;
}

interface CheckpointBarProps {
  point1: PointData;
  point2: PointData;
  point3: PointData;
  point4: PointData;
}

export default function formatData(rawData: any[]): CheckpointBarProps {
  const [obj1, obj2, obj3, obj4] = rawData || [{"": null, "": null }, { "": null, "": null }, { "": null, "": null }, { "": null, "": null }];

  const toPoint = (entry: any): PointData => {
    const [dateKey, statusKey] = Object.keys(entry);
    return {
      date: entry[dateKey] ?? "", // handles null
      stat: entry[statusKey] ?? "",
    };
  };

  return {
    point1: toPoint(obj1),
    point2: toPoint(obj2),
    point3: toPoint(obj3),
    point4: toPoint(obj4),
  };
}
