import React from "react";
// import { CheckIcon } from "@/icons/"
import styles from "./pricing.module.scss";

const tiers = [
  {
    name: "Hobby",
    href: "#",
    priceMonthly: 12,
    description: "All the basics for starting a new business",
    includedFeatures: [
      "Potenti felis, in cras at at ligula nunc.",
      "Orci neque eget pellentesque.",
    ],
  },
  {
    name: "Freelancer",
    href: "#",
    priceMonthly: 24,
    description: "All the basics for starting a new business",
    includedFeatures: [
      "Potenti felis, in cras at at ligula nunc. ",
      "Orci neque eget pellentesque.",
      "Donec mauris sit in eu tincidunt etiam.",
    ],
  },
  {
    name: "Startup",
    href: "#",
    priceMonthly: 32,
    description: "All the basics for starting a new business",
    includedFeatures: [
      "Potenti felis, in cras at at ligula nunc. ",
      "Orci neque eget pellentesque.",
      "Donec mauris sit in eu tincidunt etiam.",
      "Faucibus volutpat magna.",
    ],
  }
];

function PricingPage() {
  return (
    <div className={styles.pricing}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Pricing Plans</h1>
          <p className={styles.description}>
            Start building for free, then add a site plan to go live. Account plans unlock additional features.
          </p>
          <div className={styles["billing-options"]}>
            <button type="button" className={`${styles["billing-option"]} ${styles.active}`}>
              Monthly billing
            </button>
            <button type="button" className={styles["billing-option"]}>
              Yearly billing
            </button>
          </div>
        </div>

        <div className={styles.tiers}>
          {tiers.map((tier) => (
            <div key={tier.name} className={styles.tier}>
              <div className={styles["tier-header"]}>
                <h2 className={styles["tier-title"]}>{tier.name}</h2>
                <p className={styles["tier-description"]}>{tier.description}</p>
                <p className={styles["tier-price"]}>
                  <span className={styles["tier-price-value"]}>${tier.priceMonthly}</span>{' '}
                  <span className={styles["tier-price-unit"]}>/mo</span>
                </p>
                <a href={tier.href} className={styles["tier-buy-btn"]}>
                  Buy {tier.name}
                </a>
              </div>
              <div className={styles["tier-features"]}>
                <h3 className={styles["tier-features-title"]}>What's included</h3>
                <ul className={styles["tier-features-list"]}>
                  {tier.includedFeatures.map((feature) => (
                    <li key={feature} className={styles["tier-feature"]}>
                      {/*<CheckIcon className={styles["tier-feature-icon"]} aria-hidden="true" />*/}
                      <span className={styles["tier-feature-text"]}>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PricingPage;
