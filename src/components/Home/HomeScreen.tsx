import { useMemo } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { useAppSelector } from "../../hooks";
import { parseDate } from "../../utils/dates";

interface UpcomingTask {
  id: string | number;
  title: string;
  course: string;
  dueDate: Date;
  type: "assignment" | "recording";
  duration?: number;
}

const HomeScreen: React.FC = () => {
  const assignments = useAppSelector((state) => state.assignments.items);
  const recordings = useAppSelector((state) => state.recordings.items);
  const courses = useAppSelector((state) => state.courses.items);

  const totalTasks =
    assignments.filter((a) => !a.isCompleted).length +
    recordings.filter((r) => !r.isCompleted).length;

  const totalDuration = recordings
    .filter((r) => !r.isCompleted)
    .reduce((sum, recording) => sum + (recording.duration || 0), 0);

  const upcomingTasks = useMemo(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    const nextWeek = new Date(now);
    nextWeek.setDate(nextWeek.getDate() + 7);
    nextWeek.setHours(23, 59, 59, 999);

    const formattedAssignments: UpcomingTask[] = assignments
      .filter((a) => !a.isCompleted && a.completeBy)
      .map((a) => ({
        id: a.id,
        title: a.title,
        course: a.course,
        dueDate: parseDate(a.completeBy),
        type: "assignment",
      }));

    const formattedRecordings: UpcomingTask[] = recordings
      .filter((r) => !r.isCompleted && r.completeBy)
      .map((r) => ({
        id: r.id,
        title: r.title,
        course: r.course,
        dueDate: parseDate(r.completeBy),
        type: "recording",
        duration: r.duration,
      }));

    return [...formattedAssignments, ...formattedRecordings]
      .filter((task) => task.dueDate >= now && task.dueDate <= nextWeek)
      .sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());
  }, [assignments, recordings]);

  const getDaysRemainingBadge = (dueDate: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const start = today.getTime();
    const target = new Date(dueDate);
    target.setHours(0, 0, 0, 0);
    const end = target.getTime();

    const diffDays = Math.ceil(
      (target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
    );

    let label = `In ${diffDays} days`;
    let isUrgent = diffDays <= 1;

    if (diffDays === 0) label = "Due Today";
    else if (diffDays === 1) label = "Due Tomorrow";

    return (
      <View style={[styles.badge, isUrgent && styles.badgeUrgent]}>
        <Text style={[styles.badgeText, isUrgent && styles.badgeTextUrgent]}>
          {label}
        </Text>
      </View>
    );
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.title} numberOfLines={1}>
          UniTrack
        </Text>
        <Text style={styles.subtitle} numberOfLines={1} ellipsizeMode="tail">
          Overview & Upcoming Tasks
        </Text>
      </View>

      <View style={styles.statsGrid}>
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statIcon}>📋</Text>
            <Text style={styles.statNumber}>{totalTasks}</Text>
            <Text
              style={styles.statLabel}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              Pending Tasks
            </Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statIcon}>🎓</Text>
            <Text style={styles.statNumber}>{courses.length}</Text>
            <Text
              style={styles.statLabel}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              Active Courses
            </Text>
          </View>
        </View>

        <View style={[styles.statCard, styles.statCardWide]}>
          <View style={styles.wideCardContent}>
            <Text style={styles.statIcon}>⏱️</Text>
            <View>
              <Text
                style={styles.statLabel}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                Watch Time Left
              </Text>
              <Text
                style={styles.statSubText}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                Total remaining recordings
              </Text>
            </View>
          </View>
          <Text style={styles.statNumberAccent}>{totalDuration}h</Text>
        </View>
      </View>

      <View style={styles.sectionHeader}>
        <Text
          style={styles.sectionTitle}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          Due In The Upcoming Week
        </Text>
        <Text style={styles.taskCountBadge} numberOfLines={1}>
          {upcomingTasks.length}
        </Text>
      </View>

      {upcomingTasks.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No upcoming deadlines this week!</Text>
        </View>
      ) : (
        <View style={styles.tasksList}>
          {upcomingTasks.map((task) => (
            <View key={`${task.type}-${task.id}`} style={styles.taskCard}>
              <Text style={styles.taskTypeIcon}>
                {task.type === "assignment" ? "📝" : "📹"}
              </Text>
              <View style={styles.taskInfo}>
                <Text style={styles.taskTitle} numberOfLines={1}>
                  {task.title}
                </Text>
                <Text style={styles.taskCourse}>{task.course}</Text>
              </View>
              {getDaysRemainingBadge(task.dueDate)}
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#F5F3FF",
  },
  subtitle: {
    fontSize: 14,
    color: "#A5A1C8",
    marginTop: 2,
  },
  statsGrid: {
    gap: 12,
    marginBottom: 24,
  },
  statsRow: {
    flexDirection: "row",
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#1D1645",
    borderWidth: 1,
    borderColor: "#2E2469",
    borderRadius: 14,
    padding: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  statCardWide: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingVertical: 14,
  },
  wideCardContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
    minWidth: 0,
  },
  statIcon: {
    fontSize: 22,
    marginBottom: 4,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#F5F3FF",
  },
  statNumberAccent: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#4DD0E1",
  },
  statLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#D2CDEE",
    marginTop: 2,
    flexShrink: 1,
  },
  statSubText: {
    fontSize: 11,
    color: "#A5A1C8",
    flexShrink: 1,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#F5F3FF",
    flexShrink: 1,
  },
  taskCountBadge: {
    backgroundColor: "#2E2469",
    color: "#4DD0E1",
    fontSize: 12,
    fontWeight: "bold",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  tasksList: {
    gap: 8,
  },
  taskCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1D1645",
    borderWidth: 1,
    borderColor: "#2E2469",
    borderRadius: 12,
    padding: 12,
    gap: 12,
  },
  taskTypeIcon: {
    fontSize: 20,
  },
  taskInfo: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#F5F3FF",
    marginBottom: 2,
  },
  taskCourse: {
    fontSize: 12,
    color: "#A5A1C8",
  },
  badge: {
    backgroundColor: "#2E2469",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  badgeUrgent: {
    backgroundColor: "#FF5C8A25",
    borderWidth: 1,
    borderColor: "#FF5C8A",
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#D2CDEE",
    flexShrink: 1,
    textAlign: "center",
  },
  badgeTextUrgent: {
    color: "#FF5C8A",
    fontWeight: "700",
  },
  emptyContainer: {
    backgroundColor: "#171137",
    borderWidth: 1,
    borderColor: "#2E2469",
    borderStyle: "dashed",
    borderRadius: 14,
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  emptyText: {
    fontSize: 14,
    color: "#A5A1C8",
    fontWeight: "500",
  },
});
