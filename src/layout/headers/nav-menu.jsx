import React from "react";
import Link from "next/link";
import menu_data from "./menu-data";

const NavMenu = ({ username }) => {
  return (
    <>
      <ul>
        {menu_data.map((item, i) => (
          <li
            key={i}
            className={`${item.has_dropdown ? "has-dropdown" : ""} ${
              item.mega_menu ? "static" : ""
            }`}
          >
            <Link href={item.link}>{item.title}</Link>

            {item.sub_menus && (
              <ul className="submenu">
                {item.sub_menus.map((sub_item, sub_i) => (
                  <li
                    key={sub_i}
                    className={
                      sub_item?.children_menus && "menu-item-has-children"
                    }
                  >
                    <Link href={sub_item.link}>{sub_item.title}</Link>
                    {sub_item.children_menus && (
                      <ul className="submenu">
                        {sub_item.children_menus.map(
                          (children_item, child_i) => (
                            <li key={child_i}>
                              <Link href={children_item.link}>
                                {children_item.title}
                              </Link>
                            </li>
                          )
                        )}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            )}

            {item.mega_menu && (
              <ul className="mega-menu">
                {item.mega_menus.map((mega_item, mega_i) => (
                  <li key={mega_i} className="mega-item">
                    <Link href={mega_item.link}>{mega_item.title}</Link>
                    <ul>
                      {mega_item.layout.map((m_item, m_i) => (
                        <li key={m_i}>
                          <Link href={m_item.link}>{m_item.title}</Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            )}

            {/* Handle user-specific menu items */}
            {item.user_menu && username && (
              <ul className="user-menu">
                <li>{`Hello, ${username}`}</li>
                {item.sub_menus.map((sub_item, sub_i) => (
                  <li
                    key={sub_i}
                    className={sub_item.special ? "logout-item" : ""}
                  >
                    <Link href={sub_item.link}>{sub_item.title}</Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </>
  );
};

export default NavMenu;
