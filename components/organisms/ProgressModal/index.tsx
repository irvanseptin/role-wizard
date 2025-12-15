import React from "react";
import { ProgressLogProps } from "@/components/molecules/ProgressLog/interface";
import ProgressLog from "@/components/molecules/ProgressLog";
import "./styles.scss";

interface ProgressModalProps {
  logs: ProgressLogProps[];
}

export const ProgressModal: React.FC<ProgressModalProps> = ({ logs }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3 className="modal__title">Submitting Data</h3>
        <div className="modal__logs">
          {logs.map((log, idx) => (
            <ProgressLog key={idx} icon={log.icon} text={log.text} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressModal;
