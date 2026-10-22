'use client'

/**
 * Cầu nối icon antd cho Server Component.
 * `@ant-design/icons` dùng React context nên không import trực tiếp được trong Server Component;
 * re-export qua file 'use client' để mỗi icon thành client reference. Client Component cứ import thẳng từ '@ant-design/icons'.
 */
export {
  AimOutlined,
  ArrowRightOutlined,
  AuditOutlined,
  BankOutlined,
  CheckCircleFilled,
  DownOutlined,
  EditOutlined,
  FacebookFilled,
  FieldTimeOutlined,
  FileSearchOutlined,
  FileTextOutlined,
  InfoCircleOutlined,
  LaptopOutlined,
  MessageOutlined,
  NodeIndexOutlined,
  PhoneOutlined,
  PlayCircleFilled,
  PlayCircleOutlined,
  ReadOutlined,
  SafetyCertificateOutlined,
  TeamOutlined,
  TranslationOutlined,
  TrophyOutlined,
} from '@ant-design/icons'
