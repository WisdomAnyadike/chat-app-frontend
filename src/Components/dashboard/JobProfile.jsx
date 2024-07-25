import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useFormik } from 'formik';
import * as yup from 'yup';
import DashboardNav from './dashboardNav';
import { API_ENDPOINT } from '../../services/config';
import PDFViewer from '../PdfViewer/PdfViewer';
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';

const JobProfile = () => {
    const token = useSelector(state => state.tokenSlice.token);
    const [profile, setProfile] = useState({});
    const [PdfUrl, setPdfUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [isloading, setisLoading] = useState(true);
    const profileId = useSelector(state => state.firstProfileSlice.profileObj.profileId);
    const navigate = useNavigate()

    useEffect(() => {
        const getProfile = async () => {
            try {
                const res = await axios.get(`${API_ENDPOINT}/api/user/getProfile/${profileId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                if (res.data.status === 'okay') {
                    console.log(res.data);
                    setProfile(res.data.profile);
                    setisLoading(false)
                } else {
                    setisLoading(false)
                    console.log('error');
                }
            } catch (error) {
                console.log(error);
                setisLoading(false)
                if (error.response.data.message === 'Error Verifying Token') {
                    toast.error('session expired')
                    setTimeout(() => {
                        navigate('/')
                    }, 5000)
                }
            }
        };

        getProfile();
    }, [profileId, token]);

    const chooseFile = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        if (file) {
            reader.readAsDataURL(file);
        }

        reader.addEventListener('load', (e) => {
            setPdfUrl(e.target.result);
        });
    };

    const formik = useFormik({
        initialValues: {
            profileName: profile.profileName || '',
            coverLetter: profile.coverLetter || '',
            portfolioUrl: profile.portfolioUrl || '',
            cvUrl: profile.cvUrl || PdfUrl,
        },
        enableReinitialize: true,
        validationSchema: yup.object({
            profileName: yup.string().required('Profile Name is required'),
            coverLetter: yup.string().min(200, ['must be at least 200 words']),
            portfolioUrl: yup.string().url('Must be a valid URL').required('URL is required'),
            cvUrl: yup.string().required('PDF URL is required'),
        }),
        onSubmit: async (values) => {
            setLoading(true);
            console.log(values);
            try {
                const res = await axios.post(`${API_ENDPOINT}/api/user/updateProfile/${profileId}`, values, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                if (res.data.status === 'okay') {
                    toast.success(res.data.message);
                    setLoading(false);
                } else {
                    setLoading(false);
                }
            } catch (error) {
                toast.error(error.response.data.message);
                setLoading(false);
            }
        },
    });

    console.log(formik.errors);

    return (
        <DashboardNav props={'Job Profile'} >
            <div className={isloading ? 'main d-flex align-items-center justify-content-center h-100' : 'main'} style={{ overflowY: 'scroll' }}>
                {!isloading ?
                    <form onSubmit={formik.handleSubmit} className="container m-0">
                        <label className='app-content-plainText' htmlFor="profileName"> Profile Name </label>
                        <input
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.profileName}
                            type="text"
                            id="profileName"
                            name="profileName"
                            placeholder="Input profile name"
                        />
                        <small className='app-content-smallText'>
                            {formik.touched.profileName && formik.errors.profileName ? formik.errors.profileName : ''}
                        </small>
                        <br />
                        <label className='app-content-plainText' htmlFor="coverLetter">Cover Letter</label>
                        <textarea
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.coverLetter}
                            style={{ height: '200px', borderRadius: '15px', padding: "10px" }}
                            id="coverLetter"
                            name="coverLetter"
                        />
                        <small className='app-content-smallText'>
                            {formik.touched.coverLetter && formik.errors.coverLetter ? formik.errors.coverLetter : ''}
                        </small>
                        <br />
                        <div className="exp-cvc">
                            <div className="expiration">
                                <label className='app-content-plainText ms-2' htmlFor="portfolioUrl"> Portfolio URL </label>
                                <input
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.portfolioUrl}
                                    className="inputCard"
                                    name="portfolioUrl"
                                    id="portfolioUrl"
                                    type="text"
                                    required
                                    placeholder="https://example.com"
                                />
                                <small className='app-content-smallText ms-2'>
                                    {formik.touched.portfolioUrl && formik.errors.portfolioUrl ? formik.errors.portfolioUrl : ''}
                                </small>
                                <br />
                            </div>
                            <div className="security">
                                <label className='app-content-plainText ms-2' htmlFor="cvUrl"> Upload CV</label>
                                <input
                                    accept=".pdf"
                                    type="file"
                                    onChange={(e) => chooseFile(e)}
                                    id="cvUrl"
                                    name="cvUrl"
                                    placeholder="XXX"
                                />

                                <br />
                            </div>

                        </div>
                        
                        {profile.cvUrl && <PDFViewer  pdfUrl={PdfUrl ? PdfUrl : profile.cvUrl} />}
                        
                        
                        <div className='btn'>
                            <svg width="24" className='me-2' height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.8768 16.1682C13.0292 15.7535 13.6375 15.7535 13.7899 16.1682L14.2066 17.3023C14.2554 17.435 14.3637 17.5395 14.5013 17.5865L15.6774 17.9884C16.1075 18.1353 16.1075 18.7218 15.6774 18.8688L14.5013 19.2706C14.3637 19.3177 14.2554 19.4221 14.2066 19.5549L13.7899 20.6889C13.6375 21.1037 13.0292 21.1037 12.8768 20.6889L12.4601 19.5549C12.4113 19.4221 12.303 19.3177 12.1653 19.2706L10.9892 18.8688C10.5591 18.7218 10.5591 18.1353 10.9892 17.9884L12.1653 17.5865C12.303 17.5395 12.4113 17.435 12.4601 17.3023L12.8768 16.1682Z" stroke="#ffff" strokeWidth="1.5" strokeLinejoin="round" />
                                <path d="M14.6394 3.47278C14.8711 2.84241 15.7956 2.84241 16.0272 3.47278L16.8211 5.63332C16.8953 5.8351 17.0599 5.99384 17.2691 6.06534L19.5097 6.83089C20.1634 7.05426 20.1634 7.94574 19.5097 8.16911L17.2691 8.93466C17.0599 9.00616 16.8953 9.1649 16.8211 9.36668L16.0272 11.5272C15.7956 12.1576 14.8711 12.1576 14.6394 11.5272L13.8455 9.36668C13.7714 9.1649 13.6068 9.00616 13.3975 8.93466L11.157 8.16911C10.5032 7.94574 10.5032 7.05426 11.157 6.83089L13.3975 6.06534C13.6068 5.99384 13.7714 5.8351 13.8455 5.63332L14.6394 3.47278Z" stroke="#ffff" strokeWidth="1.5" strokeLinejoin="round" />
                                <path d="M6.48641 9.36289C6.65786 8.87904 7.34214 8.87904 7.51358 9.36289L7.9824 10.686C8.03728 10.8409 8.15913 10.9627 8.31401 11.0176L9.63711 11.4864C10.121 11.6579 10.121 12.3421 9.63711 12.5136L8.31401 12.9824C8.15913 13.0373 8.03728 13.1591 7.9824 13.314L7.51358 14.6371C7.34214 15.121 6.65786 15.121 6.48641 14.6371L6.0176 13.314C5.96272 13.1591 5.84087 13.0373 5.68599 12.9824L4.36289 12.5136C3.87904 12.3421 3.87904 11.6579 4.36289 11.4864L5.68599 11.0176C5.84087 10.9627 5.96272 10.8409 6.0176 10.686L6.48641 9.36289Z" stroke="#ffff" strokeWidth="1.5" strokeLinejoin="round" />
                            </svg>
                            <button type="submit" style={{ height: '40px', width: "120px" }} disabled={loading} className="app-content-headerButton mt-3">
                                {loading ? (
                                    <div className="spinner-border text-light" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                ) : (
                                    'Submit'
                                )}
                            </button>
                        </div>
                    </form>
                    : <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>}
            </div>
        </DashboardNav>
    );
};

export default JobProfile;
