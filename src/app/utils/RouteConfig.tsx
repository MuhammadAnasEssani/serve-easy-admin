import React, {useEffect} from 'react'
import {Route, Routes, useLocation} from 'react-router-dom'
import AuthenticationLayout from '../layouts/AuthenticationLayout'
import Login from '../views/authentications/Login'
import ForgotPassword from '../views/authentications/ForgotPassword'
import Verification from '../views/authentications/Verification'
import ResetPassword from '../views/authentications/ResetPassword'
import {ProtectedRoutes} from '../components/authentication/ProtectedRoutes'
import UserProvider from '../providers/UserProvider'
import CreateRoles from '../views/dashboard/roles/create-roles/CreateRoles'
import CreateEstablishment from '../views/dashboard/establishments/CreateEstablishment'
import CreateUsers from '../views/dashboard/users/create-users/CreateUsers'
import DashboardLayout from '../layouts/DashboardLayout'
import EstablishmentListings from '../views/dashboard/establishments/EstablishmentListings'
import NotFound from '../views/dashboard/pages/NotFound'
import UserListing from '../views/dashboard/users/UserListings'
import RoleListing from '../views/dashboard/roles/RoleListings'
import EditAPUser from '../views/dashboard/users/edit-users/EditAPUser'
import MenuListing from '../views/dashboard/menu-management/MenuListing'
import MenuTabs from '../views/dashboard/menu-management/create-product/MenuTabs'
import EditEstablishment from '../views/dashboard/establishments/EditEstablishment'
import EditAPRoles from '../views/dashboard/edit-roles/EditAPRoles'
import ModifierClassListing from '../views/dashboard/modifiers/ModifierClassListing'
import CreateModifierClass from '../views/dashboard/modifiers/CreateModifierClass'
import CreateModifier from '../views/dashboard/modifiers/CreateModifier'
import ProductClassListing from '../views/dashboard/product-class/ProductClassListings'
import PromoCodeListing from '../views/dashboard/promo/PromoCodeListing'
import CreatePromo from '../views/dashboard/promo/CreatePromo'
import EditPromo from '../views/dashboard/promo/EditPromo'
import EditModifierClass from '../views/dashboard/modifiers/EditModifierClass'
import EditModifier from '../views/dashboard/modifiers/EditModifier'
import AddProductClass from '../views/dashboard/product-class/AddProductClass'
import EditProductClass from '../views/dashboard/product-class/EditProductClass'
import CreateCustomMenu from '../views/dashboard/menu-management/custom-menu/CreateCustomMenu'
import CustomMenuDetail from '../views/dashboard/menu-management/custom-menu/CustomMenuDetail'
import CustomMenuListing from '../views/dashboard/menu-management/custom-menu/CustomMenuListings'
import {AnimatePresence} from 'framer-motion'
import OrderTabs from '../views/dashboard/orders/OrderTabs'
import OrderDetail from '../views/dashboard/orders/OrderDetail'
import CreatePrinter from '../views/dashboard/printer/CreatePrinter'
import PrinterListings from '../views/dashboard/printer/PrinterListings'
import EditPrinter from '../views/dashboard/printer/EditPrinter'
import EditCustomMenu from '../views/dashboard/menu-management/custom-menu/EditCustomMenu'
import EditMenuTabs from '../views/dashboard/menu-management/edit-product/EditMenuTabs'
import DealsComboTabs from '../views/dashboard/deal-combo/DealsComboTabs'
import PaymentsTab from '../views/dashboard/payments/PaymentsTab'
import DealsComboDetail from '../views/dashboard/deal-combo/DealsComboDetail'
import DiscountDetail from '../views/dashboard/discount/DiscountDetail'
import CreateDiscountSkeleton from '../skeletons/discount/CreateDiscountSkeleton'
import DealsComboDetailSkeleton from '../skeletons/deals-combo/DealsComboDetailSkeleton'
import DiscountDetailSkeleton from '../skeletons/discount/DiscountDetailSkeleton'
import DiscountListings from '../views/dashboard/discount/DiscountListings'
import TransactionDetails from '../views/dashboard/payments/TransactionDetails'
import EditDiscount from '../views/dashboard/discount/EditDiscount'
import ReportTabs from '../views/dashboard/reports/ReportTabs'
import TransactionDetail from '../views/dashboard/payments/TransactionDetail'
import EditDealsComboTabs from '../views/dashboard/deal-combo/EditDealsComboTabs'
import DashboardAnalyticsSkeleton from '../skeletons/DashboardAnalyticsSkeleton'
import TableManagementListing from '../views/dashboard/table-management/TableManagementListing'
import CreateTable from '../views/dashboard/table-management/CreateTable'
import EditTable from '../views/dashboard/table-management/EditTable'
import Gallery from '../views/dashboard/gallery/Gallery'
import RestaurantListing from '../views/dashboard/restaurants/RestaurantListings'
import RestaurantDetails from '../views/dashboard/restaurants/RestaurantDetails'
import CreateRestaurants from '../views/dashboard/restaurants/CreateRestaurants'
import CreateRestaurantAdmin from '../views/dashboard/users/create-restaurant-admin/CreateRestaurantAdmin'
import AdminListing from '../views/dashboard/users/AdminListings'
import CustomerManagementListing from '../views/dashboard/customer-management/CustomerManagementListing'
import CustomerDetails from '../views/dashboard/customer-management/CustomerDetails'
import PushNotifications from '../views/dashboard/customer-management/push-notification/PushNotifications'
import CMSTabs from '../views/dashboard/cms/CMSTabs'
import EmailMarketing from '../views/dashboard/customer-management/EmailMarketing'
import SettingTabs from '../views/dashboard/settings/SettingTabs'
import {BACKEND_CONSTANTS} from '../config/constants'
import {PermissionProtectedRoutes} from '../components/authentication/PermissionProtectedRoutes'
import DiscountTabs from '../views/dashboard/discount/DiscountTabs'
import Testing from '../views/dashboard/Testing'
import ComboListing from '../views/dashboard/deal-combo/ComboListing'
import DashboardAnalyticsR from '../views/dashboard/DashboardAnalyticsR'
import PosDeviceListing from '../views/dashboard/pos-devices/PosDeviceListing'
import EditManualDiscount from '../views/dashboard/discount/EditManualDiscount'
import ProductDetailView from '../views/dashboard/menu-management/create-product/ProductDetailView'
import AdminProfile from '../views/dashboard/profile/AdminProfile'
import VersionManagement from '../views/dashboard/version-management/VersionManagement'
import SuperAdminLogin from '../views/authentications/SuperAdminLogin'
import EditRestaurant from '../views/dashboard/restaurants/EditRestaurant'
import NotificationListing from '../views/dashboard/menu-notification/NotificationListing'
import EditRestaurantAdmin from '../views/dashboard/users/edit-restaurant-admin/EditRestaurantAdmin'
import PagesTabs from "../views/dashboard/cms/pages/PagesTabs";

function RouteConfig() {
  const location = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])
  return (
    <AnimatePresence>
      <Routes>
        {/*Split layout right and left*/}
        <Route element={<AuthenticationLayout />}>
          <Route index element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/super-admin-login" element={<SuperAdminLogin />} />
          <Route path="/verification" element={<Verification />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>
        {/*Dashboard Page Layouts*/}
        <Route
          element={
            <ProtectedRoutes>
              <UserProvider>
                <DashboardLayout />
              </UserProvider>
            </ProtectedRoutes>
          }
        >
          <Route path="/testing" element={<Testing />} />
          <Route path="/notification-listing" element={<NotificationListing />} />
          <Route path="/profile" element={<AdminProfile />} />
          <Route path="/version" element={<VersionManagement />} />
          <Route
            path="/create-establishment"
            element={
              <PermissionProtectedRoutes
                moduleId={BACKEND_CONSTANTS.MODULES.ESTABLISHMENT_MANAGEMENT}
                permissionName={'pivot_create'}
              >
                <CreateEstablishment />
              </PermissionProtectedRoutes>
            }
          />
          <Route
            path="/edit-establishment/:id"
            element={
              <PermissionProtectedRoutes
                moduleId={BACKEND_CONSTANTS.MODULES.ESTABLISHMENT_MANAGEMENT}
                permissionName={'pivot_update'}
              >
                <EditEstablishment />
              </PermissionProtectedRoutes>
            }
          />
          <Route
            path="/establishments"
            element={
              <PermissionProtectedRoutes
                moduleId={BACKEND_CONSTANTS.MODULES.ESTABLISHMENT_MANAGEMENT}
                permissionName={'pivot_read'}
              >
                <EstablishmentListings />
              </PermissionProtectedRoutes>
            }
          />
          <Route
            path="/pos-devices"
            element={
              <PermissionProtectedRoutes
                moduleId={BACKEND_CONSTANTS.MODULES.ESTABLISHMENT_MANAGEMENT}
                permissionName={'pivot_read'}
              >
                <PosDeviceListing />
              </PermissionProtectedRoutes>
            }
          />
          <Route
            path="/create-roles"
            element={
              <PermissionProtectedRoutes
                moduleId={BACKEND_CONSTANTS.MODULES.ROLE_MANAGEMENT}
                permissionName={'pivot_create'}
              >
                <CreateRoles />
              </PermissionProtectedRoutes>
            }
          />
          <Route
            path="/create-users"
            element={
              <PermissionProtectedRoutes
                moduleId={BACKEND_CONSTANTS.MODULES.USER_MANAGEMENT}
                permissionName={'pivot_create'}
              >
                <CreateUsers />
              </PermissionProtectedRoutes>
            }
          />
          <Route
            path="/users"
            element={
              <PermissionProtectedRoutes
                moduleId={BACKEND_CONSTANTS.MODULES.USER_MANAGEMENT}
                permissionName={'pivot_read'}
              >
                <UserListing />
              </PermissionProtectedRoutes>
            }
          />
          <Route
            path="/roles"
            element={
              <PermissionProtectedRoutes
                moduleId={BACKEND_CONSTANTS.MODULES.ROLE_MANAGEMENT}
                permissionName={'pivot_read'}
              >
                <RoleListing />
              </PermissionProtectedRoutes>
            }
          />
          <Route
            path="/edit-ap-role/:id"
            element={
              <PermissionProtectedRoutes
                moduleId={BACKEND_CONSTANTS.MODULES.ROLE_MANAGEMENT}
                permissionName={'pivot_update'}
              >
                <EditAPRoles />
              </PermissionProtectedRoutes>
            }
          />
          <Route
            path="/edit-ap-user/:id"
            element={
              <PermissionProtectedRoutes
                moduleId={BACKEND_CONSTANTS.MODULES.USER_MANAGEMENT}
                permissionName={'pivot_update'}
              >
                <EditAPUser />
              </PermissionProtectedRoutes>
            }
          />
          <Route
            path="/create-product/:id"
            element={
              <PermissionProtectedRoutes
                moduleId={BACKEND_CONSTANTS.MODULES.MENU_MANAGEMENT}
                permissionName={'pivot_create'}
              >
                <MenuTabs />
              </PermissionProtectedRoutes>
            }
          />
          <Route
            path="/edit-product/:id"
            element={
              <PermissionProtectedRoutes
                moduleId={BACKEND_CONSTANTS.MODULES.MENU_MANAGEMENT}
                permissionName={'pivot_update'}
              >
                <EditMenuTabs />
              </PermissionProtectedRoutes>
            }
          />
          <Route
            path="/menu"
            element={
              <PermissionProtectedRoutes
                moduleId={BACKEND_CONSTANTS.MODULES.MENU_MANAGEMENT}
                permissionName={'pivot_read'}
              >
                <MenuListing />
              </PermissionProtectedRoutes>
            }
          />
          <Route
            path="/single-product/:id"
            element={
              <PermissionProtectedRoutes
                moduleId={BACKEND_CONSTANTS.MODULES.MENU_MANAGEMENT}
                permissionName={'pivot_read'}
              >
                {/*<SingleProduct/>*/}
                <ProductDetailView />
              </PermissionProtectedRoutes>
            }
          />
          <Route
            path="/add-modifier-class"
            element={
              <PermissionProtectedRoutes
                moduleId={BACKEND_CONSTANTS.MODULES.MODIFIERS}
                permissionName={'pivot_create'}
              >
                <CreateModifierClass />
              </PermissionProtectedRoutes>
            }
          />
          <Route
            path="/add-modifier/:id"
            element={
              <PermissionProtectedRoutes
                moduleId={BACKEND_CONSTANTS.MODULES.MODIFIERS}
                permissionName={'pivot_create'}
              >
                <CreateModifier />
              </PermissionProtectedRoutes>
            }
          />
          <Route
            path="/edit-modifier/:id"
            element={
              <PermissionProtectedRoutes
                moduleId={BACKEND_CONSTANTS.MODULES.MODIFIERS}
                permissionName={'pivot_update'}
              >
                <EditModifier />
              </PermissionProtectedRoutes>
            }
          />
          <Route
            path="/modifiers"
            element={
              <PermissionProtectedRoutes
                moduleId={BACKEND_CONSTANTS.MODULES.MODIFIERS}
                permissionName={'pivot_read'}
              >
                <ModifierClassListing />
              </PermissionProtectedRoutes>
            }
          />
          <Route
            path="/promo-listings"
            element={
              <PermissionProtectedRoutes
                moduleId={BACKEND_CONSTANTS.MODULES.PROMO}
                permissionName={'pivot_read'}
              >
                <PromoCodeListing />
              </PermissionProtectedRoutes>
            }
          />
          <Route
            path="/custom-menu"
            element={
              <PermissionProtectedRoutes
                moduleId={BACKEND_CONSTANTS.MODULES.MENU_MANAGEMENT}
                permissionName={'pivot_read'}
              >
                <CustomMenuListing />
              </PermissionProtectedRoutes>
            }
          />
          <Route
            path="/edit-modifier-class/:id"
            element={
              <PermissionProtectedRoutes
                moduleId={BACKEND_CONSTANTS.MODULES.MODIFIERS}
                permissionName={'pivot_update'}
              >
                <EditModifierClass />
              </PermissionProtectedRoutes>
            }
          />
          <Route
            path="/create-promo"
            element={
              <PermissionProtectedRoutes
                moduleId={BACKEND_CONSTANTS.MODULES.PROMO}
                permissionName={'pivot_create'}
              >
                <CreatePromo />
              </PermissionProtectedRoutes>
            }
          />
          <Route
            path="/edit-promo/:id"
            element={
              <PermissionProtectedRoutes
                moduleId={BACKEND_CONSTANTS.MODULES.PROMO}
                permissionName={'pivot_update'}
              >
                <EditPromo />
              </PermissionProtectedRoutes>
            }
          />
          <Route path="/product-classes" element={<ProductClassListing />} />
          <Route path="/add-product-class" element={<AddProductClass />} />
          <Route path="/edit-product-class/:id" element={<EditProductClass />} />
          <Route
            path="/create-custom-menu"
            element={
              <PermissionProtectedRoutes
                moduleId={BACKEND_CONSTANTS.MODULES.MENU_MANAGEMENT}
                permissionName={'pivot_create'}
              >
                <CreateCustomMenu />
              </PermissionProtectedRoutes>
            }
          />
          <Route
            path="/custom-menu-detail/:id"
            element={
              <PermissionProtectedRoutes
                moduleId={BACKEND_CONSTANTS.MODULES.MENU_MANAGEMENT}
                permissionName={'pivot_read'}
              >
                <CustomMenuDetail />
              </PermissionProtectedRoutes>
            }
          />
          <Route
            path="/order-listings"
            element={
              <PermissionProtectedRoutes
                moduleId={BACKEND_CONSTANTS.MODULES.ORDER_MANAGEMENT}
                permissionName={'pivot_read'}
              >
                <OrderTabs />
              </PermissionProtectedRoutes>
            }
          />
          <Route
            path="/order-detail/:id"
            element={
              <PermissionProtectedRoutes
                moduleId={BACKEND_CONSTANTS.MODULES.ORDER_MANAGEMENT}
                permissionName={'pivot_read'}
              >
                <OrderDetail />
              </PermissionProtectedRoutes>
            }
          />
          <Route
            path="/edit-custom-menu/:id"
            element={
              <PermissionProtectedRoutes
                moduleId={BACKEND_CONSTANTS.MODULES.MENU_MANAGEMENT}
                permissionName={'pivot_update'}
              >
                <EditCustomMenu />
              </PermissionProtectedRoutes>
            }
          />
          <Route
            path="/create-printer"
            element={
              <PermissionProtectedRoutes
                moduleId={BACKEND_CONSTANTS.MODULES.PRINTER}
                permissionName={'pivot_create'}
              >
                <CreatePrinter />
              </PermissionProtectedRoutes>
            }
          />
          <Route
            path="/edit-printer/:id"
            element={
              <PermissionProtectedRoutes
                moduleId={BACKEND_CONSTANTS.MODULES.PRINTER}
                permissionName={'pivot_update'}
              >
                <EditPrinter />
              </PermissionProtectedRoutes>
            }
          />
          <Route
            path="/printers"
            element={
              <PermissionProtectedRoutes
                moduleId={BACKEND_CONSTANTS.MODULES.PRINTER}
                permissionName={'pivot_read'}
              >
                <PrinterListings />
              </PermissionProtectedRoutes>
            }
          />
          <Route
            path="/create-deals-combo"
            element={
              <PermissionProtectedRoutes
                moduleId={BACKEND_CONSTANTS.MODULES.MENU_MANAGEMENT}
                permissionName={'pivot_create'}
              >
                <DealsComboTabs />
              </PermissionProtectedRoutes>
            }
          />
          <Route
            path="/edit-deals-combo/:id"
            element={
              <PermissionProtectedRoutes
                moduleId={BACKEND_CONSTANTS.MODULES.MENU_MANAGEMENT}
                permissionName={'pivot_update'}
              >
                <EditDealsComboTabs />
              </PermissionProtectedRoutes>
            }
          />
          <Route
            path="/transactions"
            element={
              <PermissionProtectedRoutes
                moduleId={BACKEND_CONSTANTS.MODULES.PAYMENT}
                permissionName={'pivot_read'}
              >
                <PaymentsTab />
              </PermissionProtectedRoutes>
            }
          />
          <Route
            path="/transaction-detail/:id"
            element={
              <PermissionProtectedRoutes
                moduleId={BACKEND_CONSTANTS.MODULES.PAYMENT}
                permissionName={'pivot_read'}
              >
                <TransactionDetail />
              </PermissionProtectedRoutes>
            }
          />
          <Route
            path="/order-transactions/:id"
            element={
              <PermissionProtectedRoutes
                moduleId={BACKEND_CONSTANTS.MODULES.PAYMENT}
                permissionName={'pivot_read'}
              >
                <TransactionDetails />
              </PermissionProtectedRoutes>
            }
          />
          <Route
            path="/create-discount"
            element={
              <PermissionProtectedRoutes
                moduleId={BACKEND_CONSTANTS.MODULES.DISCOUNT}
                permissionName={'pivot_create'}
              >
                <DiscountTabs />
              </PermissionProtectedRoutes>
            }
          />
          <Route
            path="/edit-discount/:id"
            element={
              <PermissionProtectedRoutes
                moduleId={BACKEND_CONSTANTS.MODULES.DISCOUNT}
                permissionName={'pivot_update'}
              >
                <EditDiscount />
              </PermissionProtectedRoutes>
            }
          />
          <Route
            path="/edit-manual-discount/:id"
            element={
              <PermissionProtectedRoutes
                moduleId={BACKEND_CONSTANTS.MODULES.DISCOUNT}
                permissionName={'pivot_update'}
              >
                <EditManualDiscount />
              </PermissionProtectedRoutes>
            }
          />
          <Route
            path="/deals-combo-detail/:id"
            element={
              <PermissionProtectedRoutes
                moduleId={BACKEND_CONSTANTS.MODULES.MENU_MANAGEMENT}
                permissionName={'pivot_read'}
              >
                <DealsComboDetail />
              </PermissionProtectedRoutes>
            }
          />
          <Route
            path="/deal-combo-listing"
            element={
              <PermissionProtectedRoutes
                moduleId={BACKEND_CONSTANTS.MODULES.MENU_MANAGEMENT}
                permissionName={'pivot_read'}
              >
                <ComboListing />
              </PermissionProtectedRoutes>
            }
          />
          <Route
            path="/discounts"
            element={
              <PermissionProtectedRoutes
                moduleId={BACKEND_CONSTANTS.MODULES.DISCOUNT}
                permissionName={'pivot_read'}
              >
                <DiscountListings />
              </PermissionProtectedRoutes>
            }
          />
          <Route
            path="/discount-detail/:id"
            element={
              <PermissionProtectedRoutes
                moduleId={BACKEND_CONSTANTS.MODULES.DISCOUNT}
                permissionName={'pivot_read'}
              >
                <DiscountDetail />
              </PermissionProtectedRoutes>
            }
          />
          <Route path="/discount-detail-skeleton" element={<DiscountDetailSkeleton />} />
          <Route path="/create-discount-skeleton" element={<CreateDiscountSkeleton />} />
          <Route path="/deals-combo-detail-skeleton" element={<DealsComboDetailSkeleton />} />
          <Route
            path="/reports"
            element={
              <PermissionProtectedRoutes
                moduleId={BACKEND_CONSTANTS.MODULES.REPORTS}
                permissionName={'pivot_read'}
              >
                <ReportTabs />
              </PermissionProtectedRoutes>
            }
          />
          {/*<Route path="/dashboardr" element={<DashboardAnalytics/>}/>*/}
          <Route path="/dashboard" element={<DashboardAnalyticsR />} />
          <Route path="/dashboard-skeleton" element={<DashboardAnalyticsSkeleton />} />
          <Route
            path="/table-listings"
            element={
              <PermissionProtectedRoutes
                moduleId={BACKEND_CONSTANTS.MODULES.TABLE}
                permissionName={'pivot_read'}
              >
                <TableManagementListing />
              </PermissionProtectedRoutes>
            }
          />
          <Route
            path="/create-table"
            element={
              <PermissionProtectedRoutes
                moduleId={BACKEND_CONSTANTS.MODULES.TABLE}
                permissionName={'pivot_create'}
              >
                <CreateTable />
              </PermissionProtectedRoutes>
            }
          />
          <Route
            path="/edit-table/:id"
            element={
              <PermissionProtectedRoutes
                moduleId={BACKEND_CONSTANTS.MODULES.TABLE}
                permissionName={'pivot_update'}
              >
                <EditTable />
              </PermissionProtectedRoutes>
            }
          />
          <Route path="media" element={<Gallery />} />
          <Route
            path="/restaurants"
            element={
              <PermissionProtectedRoutes
                moduleId={BACKEND_CONSTANTS.MODULES.RESTAURANT_MANAGEMENT}
                permissionName={'pivot_read'}
              >
                <RestaurantListing />
              </PermissionProtectedRoutes>
            }
          />
          <Route
            path="/create-restaurant"
            element={
              <PermissionProtectedRoutes
                moduleId={BACKEND_CONSTANTS.MODULES.RESTAURANT_MANAGEMENT}
                permissionName={'pivot_create'}
              >
                <CreateRestaurants />
              </PermissionProtectedRoutes>
            }
          />
          <Route
            path="/edit-restaurant/:id"
            element={
              <PermissionProtectedRoutes
                moduleId={BACKEND_CONSTANTS.MODULES.RESTAURANT_MANAGEMENT}
                permissionName={'pivot_update'}
              >
                <EditRestaurant />
              </PermissionProtectedRoutes>
            }
          />
          <Route
            path="/restaurant-detail/:id"
            element={
              <PermissionProtectedRoutes
                moduleId={BACKEND_CONSTANTS.MODULES.RESTAURANT_MANAGEMENT}
                permissionName={'pivot_read'}
              >
                <RestaurantDetails />
              </PermissionProtectedRoutes>
            }
          />
          <Route
            path="/create-restaurant-admin"
            element={
              <PermissionProtectedRoutes
                moduleId={BACKEND_CONSTANTS.MODULES.ADMIN_MANAGEMENT}
                permissionName={'pivot_create'}
              >
                <CreateRestaurantAdmin />
              </PermissionProtectedRoutes>
            }
          />
          <Route
            path="/edit-restaurant-admin/:id"
            element={
              <PermissionProtectedRoutes
                moduleId={BACKEND_CONSTANTS.MODULES.ADMIN_MANAGEMENT}
                permissionName={'pivot_create'}
              >
                <EditRestaurantAdmin />
              </PermissionProtectedRoutes>
            }
          />
          <Route
            path="/admins"
            element={
              <PermissionProtectedRoutes
                moduleId={BACKEND_CONSTANTS.MODULES.ADMIN_MANAGEMENT}
                permissionName={'pivot_read'}
              >
                <AdminListing />
              </PermissionProtectedRoutes>
            }
          />
          <Route
            path="/customer-management-listing"
            element={
              <PermissionProtectedRoutes
                moduleId={BACKEND_CONSTANTS.MODULES.CUSTOMER_MANAGEMENT}
                permissionName={'pivot_read'}
              >
                <CustomerManagementListing />
              </PermissionProtectedRoutes>
            }
          />
          <Route
            path="/customer-details/:id"
            element={
              <PermissionProtectedRoutes
                moduleId={BACKEND_CONSTANTS.MODULES.CUSTOMER_MANAGEMENT}
                permissionName={'pivot_read'}
              >
                <CustomerDetails />
              </PermissionProtectedRoutes>
            }
          />
          <Route path="/push-notifications" element={<PushNotifications />} />
          <Route path="/email-marketing" element={<EmailMarketing />} />
          <Route path="/cms" element={<CMSTabs />} />
          <Route path="/pages" element={<PagesTabs />} />
          <Route
            path="/settings"
            element={
              <PermissionProtectedRoutes
                moduleId={BACKEND_CONSTANTS.MODULES.SETTINGS}
                permissionName={'pivot_create'}
              >
                <SettingTabs />
              </PermissionProtectedRoutes>
            }
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  )
}

export default RouteConfig
