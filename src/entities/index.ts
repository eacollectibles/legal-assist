/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: bookings
 * Interface for Bookings
 */
export interface Bookings {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  clientName?: string;
  /** @wixFieldType text */
  clientEmail?: string;
  /** @wixFieldType text */
  clientPhone?: string;
  /** @wixFieldType date */
  preferredDate?: Date | string;
  /** @wixFieldType time */
  preferredTime?: any;
  /** @wixFieldType text */
  serviceType?: string;
  /** @wixFieldType text */
  clientNotes?: string;
}


/**
 * Collection ID: clientdocuments
 * Interface for ClientDocuments
 */
export interface ClientDocuments {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  documentName?: string;
  /** @wixFieldType url */
  fileUrl?: string;
  /** @wixFieldType datetime */
  uploadDate?: Date | string;
  /** @wixFieldType text */
  clientEmail?: string;
  /** @wixFieldType text */
  fileType?: string;
  /** @wixFieldType number */
  fileSize?: number;
  /** @wixFieldType text */
  documentCategory?: string;
  /** @wixFieldType text */
  notes?: string;
}


/**
 * Collection ID: clientprofiles
 * Interface for ClientProfiles
 */
export interface ClientProfiles {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  firstName?: string;
  /** @wixFieldType text */
  lastName?: string;
  /** @wixFieldType text */
  streetAddress?: string;
  /** @wixFieldType text */
  city?: string;
  /** @wixFieldType text */
  state?: string;
  /** @wixFieldType text */
  zipCode?: string;
  /** @wixFieldType text */
  phoneNumber?: string;
  /** @wixFieldType text */
  emergencyContactName?: string;
  /** @wixFieldType text */
  emergencyContactPhone?: string;
}


/**
 * Collection ID: legalservicecategories
 * Interface for LegalServiceCategories
 */
export interface LegalServiceCategories {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  costStructure?: string;
  /** @wixFieldType text */
  complianceNotes?: string;
  /** @wixFieldType text */
  servicesIncluded?: string;
  /** @wixFieldType text */
  estimatedTimeline?: string;
  /** @wixFieldType text */
  servicesExcluded?: string;
  /** @wixFieldType text */
  faqs?: string;
  /** @wixFieldType text */
  disclaimers?: string;
  /** @wixFieldType text */
  categoryName?: string;
  /** @wixFieldType text */
  processSteps?: string;
  /** @wixFieldType text */
  shortDescription?: string;
  /** @wixFieldType text */
  detailedDescription?: string;
  /** @wixFieldType text */
  relevantTribunal?: string;
  /** @wixFieldType text */
  eligibilityCriteria?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  categoryImage?: string;
  /** @wixFieldType boolean */
  isCurrentlyOffered?: boolean;
}


/**
 * Collection ID: paymentrecords
 * Interface for PaymentRecords
 */
export interface PaymentRecords {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType number */
  paymentAmount?: number;
  /** @wixFieldType text */
  serviceType?: string;
  /** @wixFieldType date */
  paymentDate?: Date | string;
  /** @wixFieldType text */
  paymentStatus?: string;
  /** @wixFieldType text */
  transactionId?: string;
}
