import { AlertTriangle, Shield, Brain, TrendingUp } from 'lucide-react';
import RiskBadge from '../../../common/RiskBadge';

const ProfileRiskTab = ({ student, aiAnalysis }) => {
  return (
    <div className="tab-content risk-tab">
      <div className="current-risk">
        <span>Current Risk Level:</span>
        <RiskBadge level={student.riskLevel} />
      </div>

      {/* AI Analysis Section */}
      {aiAnalysis && (
        <div className="ai-analysis-section">
          <div className="ai-analysis-header">
            <Brain size={20} />
            <h4>AI Prediction Analysis</h4>
          </div>
          
          {aiAnalysis.risk_probability !== undefined && (
            <div className="ai-prediction-card">
              <div className="prediction-metric">
                <span className="metric-label">Risk Probability:</span>
                <span className="metric-value">{aiAnalysis.risk_probability?.toFixed(1)}%</span>
              </div>
              {aiAnalysis.confidence_score !== undefined && (
                <div className="prediction-metric">
                  <span className="metric-label">Confidence:</span>
                  <span className="metric-value">{aiAnalysis.confidence_score?.toFixed(1)}%</span>
                </div>
              )}
            </div>
          )}

          {aiAnalysis.predicted_factors && aiAnalysis.predicted_factors.length > 0 && (
            <div className="predicted-factors">
              <h5>Predicted Risk Factors</h5>
              {aiAnalysis.predicted_factors.map((factor, idx) => (
                <div key={idx} className="factor-item">
                  <TrendingUp size={14} />
                  <span>{factor}</span>
                </div>
              ))}
            </div>
          )}

          {aiAnalysis.recommendations && aiAnalysis.recommendations.length > 0 && (
            <div className="ai-recommendations">
              <h5>AI-Recommended Interventions</h5>
              {aiAnalysis.recommendations.map((rec, idx) => (
                <div key={idx} className="recommendation-item">
                  <p>{rec}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Factor Cards */}
      {student.riskDetails && student.riskDetails.length > 0 ? (
        <div className="risk-details-list">
          <h4>Risk Factor Details</h4>
          {student.riskDetails.map((detail, index) => (
            <div key={index} className={`risk-detail-card ${detail.severity.toLowerCase()}`}>
              <div className="risk-detail-header">
                <AlertTriangle size={16} />
                <span className="risk-detail-factor">{detail.factor}</span>
                <span className={`severity-badge ${detail.severity.toLowerCase()}`}>
                  {detail.severity}
                </span>
              </div>
              <p className="risk-detail-text">{detail.detail}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-risk-message">
          <Shield size={40} className="no-risk-icon" />
          <p>No risk factors detected. This student is on track.</p>
        </div>
      )}

      {/* Suggested Action */}
      {student.suggestedAction && student.suggestedAction !== 'None' && (
        <div className="suggested-action-card">
          <h4>Recommended Action</h4>
          <p>{student.suggestedAction}</p>
        </div>
      )}
    </div>
  );
};

export default ProfileRiskTab;
