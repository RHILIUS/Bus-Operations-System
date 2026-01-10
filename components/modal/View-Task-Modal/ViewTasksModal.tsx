'use client';

import React, { useState, useEffect } from 'react';
import styles from './view-task-modal.module.css';

const BASE_URL = process.env.NEXT_PUBLIC_Backend_BaseURL?.replace(/['"]/g, "");
const TASK_MANAGEMENT_URL = `${BASE_URL}/api/task-management`;

interface TaskTool {
  TaskToolID?: string;
  ToolID?: string | null;
  QuantityUsed?: number | null;
  Unit?: string | null;
  SourceType?: string | null;
  CostPerUnit?: number | null;
  TotalCost?: number | null;
  Notes?: string | null;
}

interface Task {
  TaskID?: string;
  TaskName: string;
  TaskType: 'Inspection' | 'Repair' | 'Replacement' | 'Cleaning' | 'Testing' | 'Documentation' | null;
  TaskDescription?: string | null;
  AssignedTo: string;
  Status: 'Pending' | 'InProgress' | 'Completed' | 'Cancelled';
  StartDate?: string | null;
  CompletedDate?: string | null;
  EstimatedHours?: number | null;
  ActualHours?: number | null;
  Notes?: string | null;
  ToolsUsed?: TaskTool[];
  isNew?: boolean;
}

interface WorkOrder {
  id: number;
  work_no: string;
  work_title: string;
  bus_no: string;
  priority: string;
  overall_status: 'Pending' | 'In Progress' | 'Done';
  tasks: Task[];
  maintenanceWorkId?: string;
}

interface ViewTasksModalProps {
  show: boolean;
  onClose: () => void;
  workOrder: WorkOrder;
  onUpdateTasks: (tasks: Task[]) => Promise<void>;
  onAddTask: (task: Omit<Task, 'TaskID'>) => Promise<void>;
}

const ViewTasksModal: React.FC<ViewTasksModalProps> = ({
  show,
  onClose,
  workOrder,
  onUpdateTasks,
  onAddTask
}) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);
  const [newTask, setNewTask] = useState<Omit<Task, 'TaskID' | 'isNew'>>({
    TaskName: '',
    TaskType: 'Inspection',
    TaskDescription: '',
    AssignedTo: '',
    Status: 'Pending',
    EstimatedHours: null,
    ActualHours: null,
    StartDate: null,
    CompletedDate: null,
    Notes: null,
    ToolsUsed: []
  });
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>(
    new Date().toLocaleString('en-US', { hour12: true })
  );

  // Fetch tasks when modal opens
  const fetchTasks = async () => {
    const maintenanceWorkId = workOrder.maintenanceWorkId || workOrder.work_no;
    
    if (!maintenanceWorkId) return;

    setLoading(true);
    try {
      const response = await fetch(`${TASK_MANAGEMENT_URL}`, {
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }

      const data = await response.json();

      // Find the maintenance work that matches our ID
      const maintenanceWork = data.find((mw: any) => 
        mw.MaintenanceWorkID === maintenanceWorkId
      );

      if (maintenanceWork && maintenanceWork.Tasks) {
        const transformedTasks: Task[] = maintenanceWork.Tasks.map((task: any) => ({
          TaskID: task.TaskID,
          TaskName: task.TaskName,
          TaskType: task.TaskType,
          TaskDescription: task.TaskDescription,
          AssignedTo: task.AssignedTo || '',
          Status: task.Status,
          EstimatedHours: task.EstimatedHours,
          ActualHours: task.ActualHours,
          StartDate: task.StartDate,
          CompletedDate: task.CompletedDate,
          Notes: task.Notes,
          ToolsUsed: task.ToolsUsed || [],
          isNew: false
        }));

        setTasks(transformedTasks);
      } else {
        setTasks([]);
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (show) {
      fetchTasks();
      setShowAddTaskForm(false);
      setNewTask({
        TaskName: '',
        TaskType: 'Inspection',
        TaskDescription: '',
        AssignedTo: '',
        Status: 'Pending',
        EstimatedHours: null,
        ActualHours: null,
        StartDate: null,
        CompletedDate: null,
        Notes: null,
        ToolsUsed: []
      });
    }
  }, [show, workOrder]);

  useEffect(() => {
    if (!show) return;
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleString('en-US', { hour12: true }));
    }, 1000);
    return () => clearInterval(interval);
  }, [show]);

  const handleTaskChange = (taskIndex: number, field: keyof Task, value: any) => {
    const updatedTasks = tasks.map((task, index) =>
      index === taskIndex ? { ...task, [field]: value } : task
    );
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (taskIndex: number) => {
    const updatedTasks = tasks.filter((_, index) => index !== taskIndex);
    setTasks(updatedTasks);
  };

  const handleSaveTasks = async () => {
    setSaving(true);
    try {
      await onUpdateTasks(tasks);
    } finally {
      setSaving(false);
    }
  };

  const handleAddNewTask = () => {
    if (!newTask.TaskName.trim() || !newTask.AssignedTo.trim()) {
      alert('Please fill in Task Name and Assignee');
      return;
    }

    const taskToAdd: Task = {
      ...newTask,
      isNew: true
    };

    setTasks([...tasks, taskToAdd]);
    
    // Reset form
    setNewTask({
      TaskName: '',
      TaskType: 'Inspection',
      TaskDescription: '',
      AssignedTo: '',
      Status: 'Pending',
      EstimatedHours: null,
      ActualHours: null,
      StartDate: null,
      CompletedDate: null,
      Notes: null,
      ToolsUsed: []
    });
    
    setShowAddTaskForm(false);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '—';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return '—';
    }
  };

  if (!show) return null;

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true">
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>Manage Tasks</h2>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close" disabled={saving}>
            ×
          </button>
        </div>

        <div className={styles.body}>
          {/* Work Order Info */}
          <div className={styles.workOrderInfo}>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Work Title:</span>
              <span className={styles.infoValue}>{workOrder.work_title}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Bus Plate Number:</span>
              <span className={styles.infoValue}>{workOrder.bus_no}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Priority:</span>
              <span className={`${styles.infoValue} ${styles.priority}`}>{workOrder.priority}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Status:</span>
              <span className={styles.infoValue}>{workOrder.overall_status}</span>
            </div>
          </div>

          <hr className={styles.divider} />

          {/* Tasks List */}
          <div className={styles.tasksSection}>
            <div className={styles.sectionHeader}>
              <h3 className={styles.sectionTitle}>Tasks ({tasks.length})</h3>
              <button
                className={styles.addTaskBtn}
                onClick={() => setShowAddTaskForm(!showAddTaskForm)}
                disabled={saving}
              >
                {showAddTaskForm ? '− Cancel' : '+ Add Task'}
              </button>
            </div>

            {/* Add Task Form */}
            {showAddTaskForm && (
              <div className={styles.addTaskForm}>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Task Name <span className={styles.required}>*</span></label>
                    <input
                      type="text"
                      className={styles.input}
                      placeholder="e.g., Replace brake pads"
                      value={newTask.TaskName}
                      onChange={(e) => setNewTask({ ...newTask, TaskName: e.target.value })}
                      disabled={saving}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Task Type <span className={styles.required}>*</span></label>
                    <select
                      className={styles.select}
                      value={newTask.TaskType || 'Inspection'}
                      onChange={(e) => setNewTask({ ...newTask, TaskType: e.target.value as Task['TaskType'] })}
                      disabled={saving}
                    >
                      <option value="Inspection">Inspection</option>
                      <option value="Repair">Repair</option>
                      <option value="Replacement">Replacement</option>
                      <option value="Cleaning">Cleaning</option>
                      <option value="Testing">Testing</option>
                      <option value="Documentation">Documentation</option>
                    </select>
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Assigned To <span className={styles.required}>*</span></label>
                    <input
                      type="text"
                      className={styles.input}
                      placeholder="Mechanic name"
                      value={newTask.AssignedTo}
                      onChange={(e) => setNewTask({ ...newTask, AssignedTo: e.target.value })}
                      disabled={saving}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Status</label>
                    <select
                      className={styles.select}
                      value={newTask.Status}
                      onChange={(e) => setNewTask({ ...newTask, Status: e.target.value as Task['Status'] })}
                      disabled={saving}
                    >
                      <option value="Pending">Pending</option>
                      <option value="InProgress">In Progress</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Estimated Hours</label>
                    <input
                      type="number"
                      className={styles.input}
                      placeholder="e.g., 2.5"
                      step="0.1"
                      min="0"
                      value={newTask.EstimatedHours || ''}
                      onChange={(e) => setNewTask({ ...newTask, EstimatedHours: e.target.value ? parseFloat(e.target.value) : null })}
                      disabled={saving}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Actual Hours</label>
                    <input
                      type="number"
                      className={styles.input}
                      placeholder="e.g., 3.0"
                      step="0.1"
                      min="0"
                      value={newTask.ActualHours || ''}
                      onChange={(e) => setNewTask({ ...newTask, ActualHours: e.target.value ? parseFloat(e.target.value) : null })}
                      disabled={saving}
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Task Description</label>
                  <textarea
                    className={styles.textarea}
                    placeholder="Additional details about this task..."
                    value={newTask.TaskDescription || ''}
                    onChange={(e) => setNewTask({ ...newTask, TaskDescription: e.target.value })}
                    rows={3}
                    disabled={saving}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Notes</label>
                  <textarea
                    className={styles.textarea}
                    placeholder="Additional notes..."
                    value={newTask.Notes || ''}
                    onChange={(e) => setNewTask({ ...newTask, Notes: e.target.value })}
                    rows={2}
                    disabled={saving}
                  />
                </div>

                <button
                  className={styles.submitTaskBtn}
                  onClick={handleAddNewTask}
                  disabled={saving}
                >
                  Add Task to List
                </button>
              </div>
            )}

            {/* Tasks Table */}
            <div className={styles.tasksTableWrapper}>
              {loading ? (
                <div style={{ padding: '2rem', textAlign: 'center' }}>Loading tasks...</div>
              ) : (
                <table className={styles.tasksTable}>
                  <thead>
                    <tr>
                      <th>Task Name</th>
                      <th>Type</th>
                      <th>Assigned To</th>
                      <th>Status</th>
                      <th>Est. Hours</th>
                      <th>Actual Hours</th>
                      <th>Start Date</th>
                      <th>Completed Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tasks.length > 0 ? (
                      tasks.map((task, index) => (
                        <tr key={task.TaskID || index} className={task.isNew ? styles.newTaskRow : ''}>
                          <td>
                            <input
                              type="text"
                              className={styles.inlineInput}
                              value={task.TaskName}
                              onChange={(e) => handleTaskChange(index, 'TaskName', e.target.value)}
                              disabled={saving}
                            />
                            {task.isNew && <span className={styles.newBadge}>New</span>}
                          </td>
                          <td>
                            <select
                              className={styles.inlineSelect}
                              value={task.TaskType || 'Inspection'}
                              onChange={(e) => handleTaskChange(index, 'TaskType', e.target.value)}
                              disabled={saving}
                            >
                              <option value="Inspection">Inspection</option>
                              <option value="Repair">Repair</option>
                              <option value="Replacement">Replacement</option>
                              <option value="Cleaning">Cleaning</option>
                              <option value="Testing">Testing</option>
                              <option value="Documentation">Documentation</option>
                            </select>
                          </td>
                          <td>
                            <input
                              type="text"
                              className={styles.inlineInput}
                              value={task.AssignedTo}
                              onChange={(e) => handleTaskChange(index, 'AssignedTo', e.target.value)}
                              disabled={saving}
                            />
                          </td>
                          <td>
                            <select
                              className={styles.statusSelect}
                              value={task.Status}
                              onChange={(e) => handleTaskChange(index, 'Status', e.target.value)}
                              disabled={saving}
                            >
                              <option value="Pending">Pending</option>
                              <option value="InProgress">In Progress</option>
                              <option value="Completed">Completed</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>
                          <td>
                            <input
                              type="number"
                              className={styles.inlineInput}
                              value={task.EstimatedHours || ''}
                              onChange={(e) => handleTaskChange(index, 'EstimatedHours', e.target.value ? parseFloat(e.target.value) : null)}
                              step="0.1"
                              min="0"
                              disabled={saving}
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              className={styles.inlineInput}
                              value={task.ActualHours || ''}
                              onChange={(e) => handleTaskChange(index, 'ActualHours', e.target.value ? parseFloat(e.target.value) : null)}
                              step="0.1"
                              min="0"
                              disabled={saving}
                            />
                          </td>
                          <td>{formatDate(task.StartDate ?? null)}</td>
                          <td>{formatDate(task.CompletedDate ?? null)}</td>
                          <td>
                            <button
                              className={styles.deleteBtn}
                              onClick={() => handleDeleteTask(index)}
                              disabled={saving}
                              title="Delete task"
                            >
                              ✕
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={9} className={styles.noTasks}>
                          No tasks added yet. Click &quot;Add Task&quot; to create one.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <small className={styles.currentTime}>{currentTime}</small>
          <button
            className={styles.saveBtn}
            onClick={handleSaveTasks}
            disabled={saving || tasks.length === 0}
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewTasksModal;