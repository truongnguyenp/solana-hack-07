import useNotificationStore from "../hooks/useNotificationStore";
import { showMessage} from "react-native-flash-message";
export function notify(newNotification: {
  type?: string
  message: string
  description?: string
  txid?: string
}) {
  const {
    notifications,
    set: setNotificationStore,
  } = useNotificationStore.getState()

  setNotificationStore((state: { notifications: any[] }) => {
    state.notifications = [
      ...notifications,
      { type: 'success', ...newNotification },
    ]
  })
}
export const showSuccessMessage = () => {
  showMessage({
    message: "Success",
    description: "This is a success message",
    type: "success",
  });
};