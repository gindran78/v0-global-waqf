-- Seeding initial data for Global Waqf platform
-- Insert default admin user (username: admin, password: admin - should be changed in production)
INSERT INTO admin_users (username, password_hash, role) VALUES 
('admin', '$2b$10$rOzJqQqQqQqQqQqQqQqQqO', 'super_admin') -- This is a placeholder hash for 'admin'
ON CONFLICT (username) DO NOTHING;

-- Insert sample Malaysian states for reference
-- Insert sample institutions
INSERT INTO institutions (name, state_code, waqf_type, governance_model, website, contact_email, description, verification_status, verification_badge) VALUES 
('Yayasan Waqf Malaysia', 'KL', 'General Waqf', 'Board of Trustees', 'https://ywm.gov.my', 'info@ywm.gov.my', 'National waqf foundation promoting Islamic endowment development across Malaysia', 'verified', true),
('Waqf Selangor', 'SEL', 'State Waqf', 'State Council', 'https://waqfselangor.gov.my', 'contact@waqfselangor.gov.my', 'Selangor state waqf institution managing endowments for education and healthcare', 'verified', true),
('Universiti Islam Antarabangsa Malaysia Endowment', 'SEL', 'Educational Waqf', 'University Board', 'https://iium.edu.my', 'endowment@iium.edu.my', 'IIUM endowment fund supporting Islamic higher education and research', 'verified', true),
('Waqf Johor Corporation', 'JHR', 'State Waqf', 'Corporate Structure', 'https://waqafjohor.gov.my', 'info@waqafjohor.gov.my', 'Johor state waqf corporation developing sustainable waqf projects', 'pending', false)
ON CONFLICT DO NOTHING;

-- Insert sample projects
INSERT INTO projects (institution_id, title, description, status, objectives, outcomes, timeline_start, timeline_end, budget_amount) VALUES 
((SELECT id FROM institutions WHERE name = 'Yayasan Waqf Malaysia' LIMIT 1), 'Waqf Hospital Kuala Lumpur', 'Modern healthcare facility serving underprivileged communities in KL', 'active', 'Provide free healthcare services to 10,000 patients annually', 'Phase 1 construction 80% complete', '2024-01-01', '2025-12-31', 50000000.00),
((SELECT id FROM institutions WHERE name = 'Waqf Selangor' LIMIT 1), 'Islamic School Network Selangor', 'Network of 5 Islamic schools providing quality education', 'completed', 'Establish 5 schools serving 2,000 students', 'All 5 schools operational, 1,800 students enrolled', '2022-01-01', '2024-06-30', 25000000.00),
((SELECT id FROM institutions WHERE name = 'Universiti Islam Antarabangsa Malaysia Endowment' LIMIT 1), 'Research Excellence Fund', 'Supporting Islamic studies and science research initiatives', 'active', 'Fund 50 research projects over 3 years', '15 projects funded, 3 published in international journals', '2024-07-01', '2027-06-30', 15000000.00)
ON CONFLICT DO NOTHING;

-- Insert sample documents
INSERT INTO documents (title, source_org, doc_type, year, theme, abstract, is_premium, language) VALUES 
('Waqf Development in Malaysia: Policy Framework 2024', 'Department of Islamic Development Malaysia', 'policy', 2024, 'Policy Development', 'Comprehensive policy framework for waqf development in Malaysia covering legal, financial and operational aspects', false, 'en'),
('Impact Assessment of Educational Waqf Projects', 'International Islamic University Malaysia', 'research', 2023, 'Education', 'Research study analyzing the socio-economic impact of educational waqf projects across Southeast Asia', true, 'en'),
('Sustainable Waqf Management Practices', 'Malaysian Waqf Foundation', 'report', 2024, 'Management', 'Best practices guide for sustainable waqf management including governance, transparency and accountability measures', false, 'ms'),
('Digital Transformation in Waqf Institutions', 'Islamic Research Institute', 'research', 2024, 'Technology', 'Study on digital adoption and transformation strategies for modern waqf institutions', true, 'en')
ON CONFLICT DO NOTHING;

-- Insert sample user for testing
INSERT INTO users (name, email, role, locale) VALUES 
('Test User', 'test@globalwaqf.org', 'user', 'en'),
('Institution Admin', 'admin@ywm.gov.my', 'institution', 'en')
ON CONFLICT (email) DO NOTHING;
