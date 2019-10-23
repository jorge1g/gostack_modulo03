// Importar mongoose
import mongoose from 'mongoose';
// Criar variavel NotificationSchema
const NotificationSchema = new mongoose.Schema(
  // Campos do schema
  {
    content: {
      type: String,
      required: true,
    },
    user: {
      type: Number,
      required: true,
    },
    read: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    // Criar campos created_at, updated_at, etc
    timestamps: true,
  }
);
// Esportação padrão
export default mongoose.model('Notification', NotificationSchema);
