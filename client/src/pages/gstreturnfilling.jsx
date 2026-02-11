import React, { useState } from 'react';
import { fileGST } from '../../../backend/services/gstApi';
import { createLogger } from 'vite';
export default function GSTReturnFiling() {
  const [formData, setFormData] = useState({
    gstin: '',
    businessName: '',
    returnPeriod: '',
    totalSales: '',
    totalPurchases: ''
  });

  const [errors, setErrors] = useState({});
  const [gstSummary, setGstSummary] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.gstin) {
      newErrors.gstin = 'GSTIN is required';
    } else if (formData.gstin.length !== 15) {
      newErrors.gstin = 'GSTIN must be exactly 15 characters';
    }

    if (!formData.businessName.trim()) {
      newErrors.businessName = 'Business name is required';
    }

    if (!formData.returnPeriod) {
      newErrors.returnPeriod = 'Return period is required';
    }

    if (!formData.totalSales || formData.totalSales <= 0) {
      newErrors.totalSales = 'Total sales must be greater than 0';
    }

    if (!formData.totalPurchases || formData.totalPurchases < 0) {
      newErrors.totalPurchases = 'Total purchases cannot be negative';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateGST = () => {
    const sales = parseFloat(formData.totalSales);
    const purchases = parseFloat(formData.totalPurchases);

    const outputTax = sales * 0.18;
    const inputTax = purchases * 0.18;
    const netGST = outputTax - inputTax;
    const cgst = netGST / 2;
    const sgst = netGST / 2;

    return {
      outputTax: outputTax.toFixed(2),
      inputTax: inputTax.toFixed(2),
      cgst: cgst.toFixed(2),
      sgst: sgst.toFixed(2),
      totalGST: netGST.toFixed(2)
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccess(false);

    if (validateForm()) {
      const summary = calculateGST();
      setGstSummary(summary);
    }
  };

  const handleFileReturn = async (e) => {
      e.preventDefault();
      setloading(true);
      setMessage("");

      try {
        const data = await fileGST(formData);
        setMessage("GST has been filed succesfully");
        console.log(data);
      } catch (err) {
        setMessage(err.message);
      } finally{
        setLoading(false);
      }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    }).format(amount);
  };

  return (
    <div style={styles.container}>
      {/* Header Section */}
      <div style={isMobile ? {...styles.topBar, ...styles.topBarMobile} : styles.topBar}>
        <div style={styles.logoSection}>
          <div style={isMobile ? {...styles.phoenixIcon, fontSize: '24px'} : styles.phoenixIcon}>🔥</div>
          <span style={isMobile ? {...styles.companyName, fontSize: '18px'} : styles.companyName}>Phoenix Professionals</span>
        </div>
      </div>

      <div style={isMobile ? {...styles.mainContent, ...styles.mainContentMobile} : styles.mainContent}>
        <div style={isMobile ? {...styles.card, ...styles.cardMobile} : styles.card}>
          <div style={styles.header}>
            <h1 style={isMobile ? {...styles.title, fontSize: '28px'} : styles.title}>GST Return Filing</h1>
            <div style={styles.divider}></div>
            <p style={isMobile ? {...styles.subtitle, fontSize: '14px'} : styles.subtitle}>Professional Tax Compliance Made Simple</p>
          </div>

          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.formGroup}>
              <label style={styles.label}>
                GSTIN
                <input
                  type="text"
                  name="gstin"
                  value={formData.gstin}
                  onChange={handleInputChange}
                  maxLength={15}
                  placeholder="Enter 15-character GSTIN"
                  style={{
                    ...styles.input,
                    ...(errors.gstin ? styles.inputError : {})
                  }}
                />
              </label>
              {errors.gstin && <span style={styles.errorText}>{errors.gstin}</span>}
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>
                Business Name
                <input
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleInputChange}
                  placeholder="Enter your registered business name"
                  style={{
                    ...styles.input,
                    ...(errors.businessName ? styles.inputError : {})
                  }}
                />
              </label>
              {errors.businessName && <span style={styles.errorText}>{errors.businessName}</span>}
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>
                Return Period
                <input
                  type="month"
                  name="returnPeriod"
                  value={formData.returnPeriod}
                  onChange={handleInputChange}
                  style={{
                    ...styles.input,
                    ...(errors.returnPeriod ? styles.inputError : {})
                  }}
                />
              </label>
              {errors.returnPeriod && <span style={styles.errorText}>{errors.returnPeriod}</span>}
            </div>

            <div style={isMobile ? {...styles.formRow, flexDirection: 'column', gap: '24px'} : styles.formRow}>
              <div style={styles.formGroup}>
                <label style={styles.label}>
                  Total Sales (₹)
                  <input
                    type="number"
                    name="totalSales"
                    value={formData.totalSales}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    style={{
                      ...styles.input,
                      ...(errors.totalSales ? styles.inputError : {})
                    }}
                  />
                </label>
                {errors.totalSales && <span style={styles.errorText}>{errors.totalSales}</span>}
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>
                  Total Purchases (₹)
                  <input
                    type="number"
                    name="totalPurchases"
                    value={formData.totalPurchases}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    style={{
                      ...styles.input,
                      ...(errors.totalPurchases ? styles.inputError : {})
                    }}
                  />
                </label>
                {errors.totalPurchases && <span style={styles.errorText}>{errors.totalPurchases}</span>}
              </div>
            </div>

            <button type="submit" style={styles.submitButton}>
              Calculate GST
            </button>
          </form>

          {gstSummary && (
            <div style={styles.summaryCard}>
              <div style={styles.summaryHeader}>
                <h2 style={styles.summaryTitle}>Tax Calculation Summary</h2>
                <div style={styles.summaryDivider}></div>
              </div>
              
              <div style={isMobile ? {...styles.summaryGrid, gridTemplateColumns: '1fr', padding: '20px'} : styles.summaryGrid}>
                <div style={styles.summaryItem}>
                  <div style={styles.summaryIcon}>📤</div>
                  <div style={styles.summaryContent}>
                    <span style={styles.summaryLabel}>Output Tax</span>
                    <span style={styles.summaryValue}>{formatCurrency(gstSummary.outputTax)}</span>
                  </div>
                </div>

                <div style={styles.summaryItem}>
                  <div style={styles.summaryIcon}>📥</div>
                  <div style={styles.summaryContent}>
                    <span style={styles.summaryLabel}>Input Tax</span>
                    <span style={styles.summaryValue}>{formatCurrency(gstSummary.inputTax)}</span>
                  </div>
                </div>

                <div style={styles.summaryItem}>
                  <div style={styles.summaryIcon}>🏛️</div>
                  <div style={styles.summaryContent}>
                    <span style={styles.summaryLabel}>CGST (9%)</span>
                    <span style={styles.summaryValue}>{formatCurrency(gstSummary.cgst)}</span>
                  </div>
                </div>

                <div style={styles.summaryItem}>
                  <div style={styles.summaryIcon}>🏢</div>
                  <div style={styles.summaryContent}>
                    <span style={styles.summaryLabel}>SGST (9%)</span>
                    <span style={styles.summaryValue}>{formatCurrency(gstSummary.sgst)}</span>
                  </div>
                </div>
              </div>

              <div style={isMobile ? {...styles.totalSection, padding: '20px'} : styles.totalSection}>
                <div style={isMobile ? {...styles.totalContent, flexDirection: 'column', gap: '8px', alignItems: 'flex-start'} : styles.totalContent}>
                  <span style={isMobile ? {...styles.totalLabel, fontSize: '14px'} : styles.totalLabel}>Total GST Payable</span>
                  <span style={isMobile ? {...styles.totalValue, fontSize: '24px'} : styles.totalValue}>{formatCurrency(gstSummary.totalGST)}</span>
                </div>
              </div>

              <button onClick={handleFileReturn} style={isMobile ? {...styles.fileButton, margin: '20px', width: 'calc(100% - 40px)', padding: '14px 24px', fontSize: '14px'} : styles.fileButton}>
                <span style={styles.buttonIcon}>✓</span>
                File Return
              </button>

              {showSuccess && (
                <div style={isMobile ? {...styles.successMessage, margin: '0 20px 20px', fontSize: '14px', padding: '16px'} : styles.successMessage}>
                  <div style={styles.successIcon}>✓</div>
                  <span>GST Return Filed Successfully (Mock)</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div style={styles.footer}>
        <p style={styles.footerText}>© 2026 Phoenix Professionals | Professional Tax & Compliance Services</p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(to bottom, #f8f9fa 0%, #e9ecef 100%)',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    display: 'flex',
    flexDirection: 'column'
  },
  topBar: {
    background: 'linear-gradient(135deg, #0f2557 0%, #1a3a6e 100%)',
    padding: '20px 40px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 100
  },
  topBarMobile: {
    padding: '16px 20px'
  },
  logoSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  phoenixIcon: {
    fontSize: '32px',
    filter: 'drop-shadow(0 0 8px rgba(255, 140, 0, 0.6))'
  },
  companyName: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: '0.5px'
  },
  mainContent: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 20px'
  },
  mainContentMobile: {
    padding: '20px 12px',
    alignItems: 'flex-start'
  },
  card: {
    background: '#ffffff',
    borderRadius: '16px',
    boxShadow: '0 10px 40px rgba(15, 37, 87, 0.12)',
    padding: '48px',
    maxWidth: '900px',
    width: '100%',
    border: '1px solid #e9ecef'
  },
  cardMobile: {
    padding: '24px 20px',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(15, 37, 87, 0.1)'
  },
  header: {
    textAlign: 'center',
    marginBottom: '32px'
  },
  title: {
    fontSize: '36px',
    fontWeight: '700',
    color: '#0f2557',
    marginBottom: '12px',
    letterSpacing: '-0.5px'
  },
  divider: {
    width: '80px',
    height: '4px',
    background: 'linear-gradient(90deg, #ff8c00 0%, #ffa500 100%)',
    margin: '0 auto 16px',
    borderRadius: '2px'
  },
  subtitle: {
    fontSize: '16px',
    color: '#6c757d',
    margin: 0,
    fontWeight: '500'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    flex: 1
  },
  formRow: {
    display: 'flex',
    gap: '20px'
  },
  label: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#0f2557',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  input: {
    padding: '14px 18px',
    fontSize: '15px',
    border: '2px solid #dee2e6',
    borderRadius: '8px',
    outline: 'none',
    transition: 'all 0.3s ease',
    backgroundColor: '#ffffff',
    color: '#212529',
    fontFamily: 'inherit'
  },
  inputError: {
    borderColor: '#dc3545',
    backgroundColor: '#fff5f5'
  },
  errorText: {
    fontSize: '13px',
    color: '#dc3545',
    marginTop: '-4px',
    fontWeight: '500'
  },
  submitButton: {
    padding: '16px 32px',
    fontSize: '16px',
    fontWeight: '700',
    color: '#ffffff',
    background: 'linear-gradient(135deg, #0f2557 0%, #1a3a6e 100%)',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(15, 37, 87, 0.3)',
    marginTop: '8px',
    textTransform: 'uppercase',
    letterSpacing: '1px'
  },
  summaryCard: {
    marginTop: '40px',
    padding: '0',
    background: '#ffffff',
    borderRadius: '12px',
    border: '2px solid #0f2557',
    overflow: 'hidden'
  },
  summaryHeader: {
    background: 'linear-gradient(135deg, #0f2557 0%, #1a3a6e 100%)',
    padding: '20px 24px',
    borderBottom: '3px solid #ff8c00'
  },
  summaryTitle: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#ffffff',
    margin: 0,
    letterSpacing: '0.5px'
  },
  summaryDivider: {
    width: '60px',
    height: '3px',
    background: '#ff8c00',
    marginTop: '12px',
    borderRadius: '2px'
  },
  summaryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '0',
    padding: '32px'
  },
  summaryItem: {
    display: 'flex',
    gap: '16px',
    padding: '16px',
    borderRight: '1px solid #e9ecef',
    borderBottom: '1px solid #e9ecef'
  },
  summaryIcon: {
    fontSize: '28px',
    minWidth: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  summaryContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    flex: 1
  },
  summaryLabel: {
    fontSize: '12px',
    fontWeight: '700',
    color: '#6c757d',
    textTransform: 'uppercase',
    letterSpacing: '0.8px'
  },
  summaryValue: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#0f2557'
  },
  totalSection: {
    background: 'linear-gradient(135deg, #ff8c00 0%, #ffa500 100%)',
    padding: '28px 32px',
    margin: '0'
  },
  totalContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  totalLabel: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#ffffff',
    textTransform: 'uppercase',
    letterSpacing: '1px'
  },
  totalValue: {
    fontSize: '32px',
    fontWeight: '800',
    color: '#ffffff',
    textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
  },
  fileButton: {
    width: 'calc(100% - 64px)',
    margin: '32px',
    padding: '18px 32px',
    fontSize: '16px',
    fontWeight: '700',
    color: '#ffffff',
    background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(40, 167, 69, 0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    textTransform: 'uppercase',
    letterSpacing: '1px'
  },
  buttonIcon: {
    fontSize: '20px',
    fontWeight: '900'
  },
  successMessage: {
    margin: '0 32px 32px',
    padding: '20px',
    background: 'linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%)',
    color: '#155724',
    borderRadius: '8px',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: '15px',
    border: '2px solid #28a745',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    letterSpacing: '0.5px'
  },
  successIcon: {
    fontSize: '24px',
    fontWeight: '900',
    color: '#28a745'
  },
  footer: {
    background: '#0f2557',
    padding: '24px',
    textAlign: 'center',
    borderTop: '3px solid #ff8c00'
  },
  footerText: {
    margin: 0,
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: '500',
    opacity: 0.9
  }
};