import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import EditableForm from '../components/EditableForm';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function FormPage() {
    const { serviceId } = useParams();
    const [formData, setFormData] = useState(null);

    useEffect(() => {
        // Get form data from sessionStorage (set by DocumentUpload page)
        const stored = sessionStorage.getItem(`formData_${serviceId}`);
        if (stored) {
            setFormData(JSON.parse(stored));
        } else {
            // If no data, could show empty form or redirect
            setFormData({});
        }
    }, [serviceId]);

    if (!formData) {
        return (
            <div style={{ textAlign: 'center', padding: '50px' }}>
                <p>Loading form...</p>
            </div>
        );
    }

    return (
        <div>
            <Header />
            <EditableForm data={formData} serviceId={serviceId} />
            <Footer />
        </div>
    );
}
