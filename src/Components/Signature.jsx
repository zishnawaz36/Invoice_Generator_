import { useState } from "react";
function Signature() {
    const [signature, setSignature] = useState('');
    const [authorizedSignature, setAuthorizedSignature] = useState('');
    return (
      <div className="signature">
         <div className="signatures">
        <h5>Signatures</h5>
        <label>
          Signature:
          <input
            type="text"
            value={signature}
            onChange={(e) => setSignature(e.target.value)}
            placeholder="Enter Signature"
          />
        </label>
        <br />
        <label>
          Authorized Signature:
          <input
            type="text"
            value={authorizedSignature}
            onChange={(e) => setAuthorizedSignature(e.target.value)}
            placeholder="Enter Authorized Signature"
          />
        </label>
      </div>
      </div>
    );
  }
  
  export default Signature;
  