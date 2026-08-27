/*
 * โหมดทดสอบ: app.js จะใช้ข้อมูลชุดนี้เมื่อ USE_MOCK_DATA เป็น true
 * เปลี่ยน/เพิ่มรายการได้โดยรักษาชื่อ field ให้ตรงกับ Google Sheets
 */
window.MOCK_DATA = {
  status: 'success',
  portfolio: [
    { ID: 'P001', Title: 'การขับเคลื่อนโมเดล SMART ROMPHO', Category: 'ผลงาน/นวัตกรรม', Description: 'นวัตกรรมการบริหารจัดการและพัฒนาคุณภาพผู้เรียนอย่างเป็นระบบ', Image_URL: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80', Date: '2026-05-20' },
    { ID: 'P002', Title: 'กิจกรรมค่ายลูกเสือ Scout Day Camp', Category: 'กิจกรรมพัฒนาผู้เรียน', Description: 'เสริมสร้างวินัย ความเป็นผู้นำ และทักษะการทำงานร่วมกันของผู้เรียน', Image_URL: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80', Date: '2026-07-12' },
    { ID: 'P003', Title: 'โครงงานระบบรดน้ำอัจฉริยะ', Category: 'ผลงานนักเรียน', Description: 'ผลงานนักเรียนรายวิชาวิทยาการคำนวณ ประยุกต์ใช้ micro:bit และเซนเซอร์', Image_URL: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80', Date: '2026-06-02' },
    { ID: 'P004', Title: 'รางวัลครูผู้สอนดีเด่น', Category: 'เกียรติบัตรและรางวัล', Description: 'เกียรติบัตรเชิดชูเกียรติด้านการจัดการเรียนรู้เชิงรุก', Image_URL: '', Date: '2026-03-28' }
  ],
  documents: [
    { ID: 'D001', Doc_Name: 'คำสั่งมอบหมายงาน ประจำปีการศึกษา 2569', Category: 'คำสั่งโรงเรียน', Recipient: 'ผอ.ชโยทิศ', File_URL: 'https://drive.google.com/', Date: '2026-05-15' },
    { ID: 'D002', Doc_Name: 'ฟอร์มแจ้งซ่อมครุภัณฑ์และระบบสารสนเทศ', Category: 'แบบฟอร์มทั่วไป', Recipient: 'คุณธนกร', File_URL: 'https://drive.google.com/', Date: '2026-06-01' },
    { ID: 'D003', Doc_Name: 'แผนการสอนและไฟล์ ปพ. รายวิชาเทคโนโลยี', Category: 'งานวิชาการ', Recipient: 'ครูวราภรณ์', File_URL: 'https://drive.google.com/', Date: '2026-06-18' },
    { ID: 'D004', Doc_Name: 'แนวทางการวัดและประเมินผลผู้เรียน', Category: 'งานวิชาการ', Recipient: 'ครูเฉลิมพล', File_URL: 'https://drive.google.com/', Date: '2026-07-05' }
  ],
  settings: {
    teacher_name: 'ครูเฉลิมพล จันทร์แดง', school_name: 'โรงเรียนบ้านไร่', teacher_role: 'ครูผู้สอน',
    teacher_initial: 'ช', teacher_bio: 'สร้างการเรียนรู้ สนุก ทันสมัย และเติบโตไปพร้อมผู้เรียน',
    subjects: 'เทคโนโลยี|วิทยาการคำนวณ|การงานอาชีพ|ต้านทุจริตศึกษา'
  },
  schedule: [
    { ID: 'S001', Day: 'จันทร์', Period: '1', Subject: 'เทคโนโลยี', Class: '', Room: '' },
    { ID: 'S002', Day: 'จันทร์', Period: '2', Subject: 'วิทยาการคำนวณ', Class: '', Room: '' },
    { ID: 'S003', Day: 'อังคาร', Period: '1', Subject: 'วิทยาการคำนวณ', Class: '', Room: '' },
    { ID: 'S004', Day: 'พุธ', Period: '1', Subject: 'การงานอาชีพ', Class: '', Room: '' },
    { ID: 'S005', Day: 'พฤหัสบดี', Period: '1', Subject: 'เทคโนโลยี', Class: '', Room: '' },
    { ID: 'S006', Day: 'ศุกร์', Period: '1', Subject: 'ต้านทุจริตศึกษา', Class: '', Room: '' }
  ],
  workload: [
    { ID: 'W001', Title: 'งานจัดการเรียนรู้', Description: 'วางแผน จัดการเรียนรู้ วัดและประเมินผลใน 4 รายวิชา', Type: 'งานหลัก' },
    { ID: 'W002', Title: 'ดูแลผู้เรียน', Description: 'ติดตาม ส่งเสริม และพัฒนาผู้เรียนรายบุคคล', Type: 'งานหลัก' },
    { ID: 'W003', Title: 'งานวิชาการ', Description: 'จัดทำเอกสารแผนการสอนและหลักฐานการเรียนรู้', Type: 'สนับสนุน' },
    { ID: 'W004', Title: 'พัฒนาสื่อดิจิทัล', Description: 'สร้างและดูแลสื่อ/ระบบเทคโนโลยีเพื่อการเรียนรู้', Type: 'สนับสนุน' }
  ],
  specialTasks: [
    { ID: 'T001', Title: 'กิจกรรมพัฒนาผู้เรียน', Description: 'สนับสนุนกิจกรรมค่ายลูกเสือ Scout Day Camp และกิจกรรมเสริมทักษะชีวิต', Accent: 'amber' },
    { ID: 'T002', Title: 'ส่งเสริมเทคโนโลยีสารสนเทศ', Description: 'ดูแลและสนับสนุนสื่อดิจิทัลในการจัดการเรียนรู้', Accent: 'sky' },
    { ID: 'T003', Title: 'ต้านทุจริตศึกษา', Description: 'ร่วมขับเคลื่อนกิจกรรมและการเรียนรู้ด้านความซื่อสัตย์สุจริต', Accent: 'rose' }
  ]
};
