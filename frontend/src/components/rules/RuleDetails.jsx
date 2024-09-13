import { Chip } from "@mui/material";
import PropTypes from "prop-types";

const formatKindValue = (kind, value) => {
  switch (kind) {
    case "equals":
      return `= ${value} .-`;
    case "minus":
      return `-${value} .-`;
    case "percent":
      return `-${value} %`;
    default:
      return value;
  }
};

const RuleChips = ({ rule }) => {
  return (
    <>
      <Chip label={rule.active === "1" ? "active" : "inactive"} />
      <Chip label={`priority: ${rule.priority}`} />
      <Chip label={formatKindValue(rule.kind, rule.value)} />
    </>
  );
};

RuleChips.propTypes = {
  rule: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string,
    created_at: PropTypes.string,
    updated_at: PropTypes.string,
    priority: PropTypes.string.isRequired,
    kind: PropTypes.oneOf(["percent", "equals", "minus"]).isRequired,
    value: PropTypes.string.isRequired,
    active: PropTypes.oneOf(["1", "0"]).isRequired,
    logic_blocks: PropTypes.string,
  }).isRequired,
};

export default RuleChips;
